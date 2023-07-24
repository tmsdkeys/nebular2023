---
sidebar_position: 2
sidebar_label: 'IBC & Solidity'
---

# Using IBC in Solidity

IBC enabled smart contracts act as IBC application modules, within the interoperability model:

- **application layer**
- transport layer
- state layer

This will be your concern as a smart contract developer, the transport and state layers are taken care of by Polymer and the IBC SDK.

## IBC application requirements

From the [IBC documentation on IBC apps](https://ibc.cosmos.network/main/ibc/apps/apps.html), these are the tasks to implement to make your smart contract IBC enabled:

- implement the `IBCModule` interface, i.e.:
  - channel (opening) handshake callbacks
  - channel closing handshake callbacks
  - packet callbacks
- define your own packet data and acknowledgement structs as well as how to encode/decode them

The following requirements require some explanation

- Bind to a port(s): This will be performed automatically by Polymer so you as dapp developer do not need to be concerned with the port binding. The port ID is simply be the contract address with a prefix; `IBC_PortID` =` portPrefix` + `IBC_ContractAddress `
  :::tip

  Remember from the [IBC overview](../../concepts/IBC/ibc.md) that ports facilitate module authentication? And that only a port owner (module or contract) can operate on all channels created with the port

  :::

- (add keeper methods): specific to ibc-go, in the context where the IBC application is a dapp, this refers to the dapp methods that handle application logic
- add a route to the IBC router: this will be taken care of by the vIBC smart contract

You will have to focus on the requirements above, implementing the `IBCModule` interface and defining packet and acknowledgment data structures.

## The IBC callbacks

Consider the following simple Solidity contract, [`Mars.sol`](https://github.com/open-ibc/vibc-core-smart-contracts/blob/main/contracts/Mars.sol).

You'll note that we import some interfaces, `IbcReceiver` and `IbcDispatcher`.

```solidity [https://github.com/open-ibc/vibc-core-smart-contracts/blob/main/contracts/Mars.sol]
import './IbcReceiver.sol';
import './IbcDispatcher.sol';

contract Mars is IbcReceiver, Ownable {
    ...
       function greet(
        IbcDispatcher dispatcher,
        string calldata message,
        bytes32 channelId,
        uint64 timeoutTimestamp,
        PacketFee calldata fee
    ) external payable {
        uint256 maxFee = fee.ackFee > fee.timeoutFee ? fee.ackFee : fee.timeoutFee;
        dispatcher.sendPacket{value: fee.recvFee + maxFee}(channelId, bytes(message), timeoutTimestamp, fee);
    }
}
```

### IbcReceiver

Let's take a look at those interfaces, [`IbcReceiver`](https://github.com/open-ibc/vibc-core-smart-contracts/blob/main/contracts/IbcReceiver.sol) to begin with.

```solidity
/**
 * @title IbcReceiver
 * @author Polymer Labs
 * @notice IBC receiver interface must be implemented by a IBC-enabled contract.
 * The implementer, aka. dApp devs, should implement channel handshake and packet handling methods.
 */
interface IbcReceiver {
    //
    // Packet handling methods
    //

    function onRecvPacket(IbcPacket calldata packet) external returns (AckPacket memory ackPacket);

    function onAcknowledgementPacket(IbcPacket calldata packet) external;

    function onTimeoutPacket(IbcPacket calldata packet) external;

    //
    // Channel handshake methods
    //

    function onOpenIbcChannel(
        string calldata version,
        ChannelOrder ordering,
        string[] calldata connectionHops,
        string calldata counterpartyPortId,
        bytes32 counterpartyChannelId,
        string calldata counterpartyVersion
    ) external returns (string memory selectedVersion);

    function onConnectIbcChannel(
        bytes32 channelId,
        bytes32 counterpartyChannelId,
        string calldata counterpartyVersion
    ) external;

    function onCloseIbcChannel(
        bytes32 channelId,
        string calldata counterpartyPortId,
        bytes32 counterpartyChannelId
    ) external;
}
```

This interface satisfies the The [ICS-26](https://github.com/cosmos/ibc/blob/main/spec/core/ics-026-routing-module/README.md) specification for an `IBCModule`.

Note that in a different file, [`Ibc.sol``](https://github.com/open-ibc/vibc-core-smart-contracts/blob/main/contracts/Ibc.sol), the following structs get defined, corresponding to the IBC specification:

```solidity
struct IbcEndpoint {
    string portId;
    bytes32 channelId;
}

/// In IBC each package must set at least one type of timeout:
/// the timestamp or the block height.
struct IbcTimeout {
    uint64 blockHeight;
    uint64 timestamp;
}

struct IbcPacket {
    /// identifies the channel and port on the sending chain.
    IbcEndpoint src;
    /// identifies the channel and port on the receiving chain.
    IbcEndpoint dest;
    /// The sequence number of the packet on the given channel
    uint64 sequence;
    bytes data;
    /// when packet times out, measured on remote chain
    IbcTimeout timeout;
}
```

Please refer to the [IBC overview in the docs](../../concepts/IBC/ibc.md/#the-ibc-application-module-callbacks) for additional background info.

:::info Where's the remaining handshake steps?

For regulars of ibc-go, this may seem like the channel handshake is missing two callbacks. However, it is simply vIBC internals (`Dispatcher.sol`) picking the right choice of handshake step during both `openIbcChannel` and `connectIbcChannel` methods, as depending on where the handshake was triggered each side will only go through two of the steps.

:::

### `onRecvPacket` workflow

One thing to note from the above is that the `onRecvPacket` returns an acknowledgement, according to the [spec](https://github.com/cosmos/ibc/tree/main/spec/core/ics-026-routing-module#packet-relay).

Consider the `Mars.sol` example from earlier and how it implements the callback.

```solidity
function onRecvPacket(IbcPacket calldata packet) external returns (AckPacket memory ackPacket) {
        recvedPackets.push(packet);

        // here you'll typically decode the packet.data and do something with it

        return AckPacket(true, abi.encodePacked('{ "account": "account", "reply": "got the message" }'));
    }

//where... (defined in `Ibc.sol`)
struct AckPacket {
    // success indidates the dApp-level logic. Even when a dApp fails to process a packet per its dApp logic, the
    // delivery of packet and ack packet are still considered successful.
    bool success;
    bytes data;
}
```

### IbcDispatcher and sending packets

Now you've seen the code to receive, acknowledge or timeout packets, but how to actually send them?

That's where the [`IbcDispatcher`](https://github.com/open-ibc/vibc-core-smart-contracts/blob/main/contracts/IbcDispatcher.sol) interface comes into play:

```solidity
/**
 * @title IbcDispatcher
 * @author Polymer Labs
 * @notice IBC dispatcher interface is the Polymer Core Smart Contract that implements the core IBC protocol.
 */
interface IbcDispatcher {
    function closeIbcChannel(bytes32 channelId) external;

    function sendPacket(
        bytes32 channelId,
        bytes calldata payload,
        uint64 timeoutTimestamp,
        PacketFee calldata fee
    ) external payable;
}
```

There's one more vIBC core smart contract, the [`Dispatcher.sol`](https://github.com/open-ibc/vibc-core-smart-contracts/blob/main/contracts/Dispatcher.sol#L459) that implements the interface and which you'll need to call to send packets.

:::tip

Find the vIBC smart contracts on the chain you want to deploy your IBC enabled contracts. This is the only address you'll need (in addition to importing the interfaces).

:::

When you send packets from your contracts, you can call into the `Dispatcher.sol`'s `sendPacket` method and the vIBC smart contracts will take care of the rest, much like ibc-go's core handler would do in a Cosmos SDK native IBC setup.

```solidity
function greet(
        IbcDispatcher dispatcher,
        string calldata message,
        bytes32 channelId,
        uint64 timeoutTimestamp,
        uint256 fee
    ) external payable {
        dispatcher.sendPacket{value: fee}(channelId, bytes(message), timeoutTimestamp, fee);
    }
```

### Port binding

Having implemented these methods, once you instantiate an instance of the contract it will be assigned a port (automatically) following the format: `IBC_PortID` =` portPrefix` + `IBC_ContractAddress `.

## Example?

You can follow the [quickstart tutorial](../../quickstart/quickstart-1.md) to see the development workflow in action.
