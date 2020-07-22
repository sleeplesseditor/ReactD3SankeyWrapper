import React from 'react';

export const ShipperTab = ({ counterParties, editTrade, deleteTrade, form, handleTrade, handleTradeFormChange, isEditing, streams, trades }) => {
    return (
        <div className="tab-content-shipper">
            <h1 className="box__heading">Trade History</h1>
            <form>
            <table className="table is-striped is-fullwidth">
                <thead>
                <tr>
                    <th>Month</th>
                    <th>Volume</th>
                    <th>Stream</th>
                    <th>Counterparty</th>
                    <th />
                </tr>
                </thead>
                <tbody>
                {trades && trades.map((trade, index) => (
                    <tr key={trade.id}>

                    <td>
                        {trade.month}
                    </td>

                    <td>
                        {trade.volume}
                    </td>

                    <td>
                        {trade.stream && trade.stream.name}
                    </td>

                    <td>
                        {trade.counterparty && trade.counterparty.name}
                    </td>
                    <td>
                        <div className="field is-grouped">
                        <p className="control">
                            <button name="edit-button" className="button is-warning is-small" onClick={() => { editTrade(trade); }} type="button">Edit</button>
                        </p>
                        <p className="control">
                            <button name="delete-button" className="button is-danger is-small" onClick={() => { deleteTrade(trade.id, index); }} type="button">Delete</button>
                        </p>
                        </div>
                    </td>
                    </tr>
                ))}
                <tr>
                    <td>
                    <input className="input is-fullwidth" type="date" name="month" value={form.month} onChange={handleTradeFormChange} />
                    </td>
                    <td>
                    <input className="input is-fullwidth" type="number" step="100" name="volume" value={form.volume} onChange={handleTradeFormChange} />
                    </td>
                    <td>
                    <div className="select is-fullwidth">
                        <select name="stream" value={form.stream} onChange={handleTradeFormChange}>
                        <option>Select Stream</option>
                        {streams.map(stream => (
                            <option value={stream.id} key={stream.id}>{stream.name}</option>
                        ))}
                        </select>
                    </div>
                    </td>
                    <td colSpan="2">
                    <div className="select is-fullwidth">
                        <select name="counterparty" value={form.counterparty} onChange={handleTradeFormChange}>
                        <option>Select Counterparty</option>
                        {counterParties.map(cp => (
                            <option value={cp.id} key={cp.id}>{cp.name}</option>
                        ))}
                        </select>
                    </div>
                    </td>
                    <td />
                </tr>
                </tbody>
            </table>
            <button className={`button ${isEditing ? 'is-warning' : 'is-primary'}`} type="button" name="submit-button" onClick={() => { handleTrade(); }}>
                {isEditing ? 'Edit Trade' : 'Save Trade'}
            </button>
            </form>
        </div>
    )
};

export const operatorTab = ({ counterParties, handleOperatorFormChange, operatorStreams }) => {
    return (
        <div className="tab-content-operator">
            <h1 className="box__heading">Stream Allocation</h1>
            <form>
            <table className="table is-striped is-fullwidth">
                <thead>
                <tr>
                    <th>Stream</th>
                    <th>Nominations</th>
                    <th>Allocation (Counterparty A)</th>
                    <th>Allocation (Counterparty B)</th>
                    <th>Allocation (Counterparty C)</th>
                    <th />
                </tr>
                </thead>
                <tbody>
                {Object.keys(operatorStreams).map((operatorStreamId) => {
                    const operatorStream = operatorStreams[operatorStreamId];
                    return (
                    <tr key={operatorStream.id}>
                        <td>
                        {operatorStream.name}
                        </td>
                        <td>
                        {operatorStream.nomination}
                        </td>
                        {counterParties.map(cp => (
                        <td key={`${operatorStreamId}-${cp.id}`}>
                            <input className="input is-fullwidth" type="number" step="100" name="allocation" value={operatorStream.allocations[cp.id]} onChange={(e) => { handleOperatorFormChange(e, operatorStream.id, cp.id); }} />
                        </td>
                        ))}
                    </tr>
                    );
                })}
                </tbody>
            </table>
            </form>
        </div>
    )
}