export default function CartAmountBtn({ qty, onChangeQty }) {
    function changeQty(delta) {
        const newQty = qty + delta;

        if (newQty < 1) {
            onChangeQty(0);
            return;
        }

        onChangeQty(newQty);
    }

    const btnStyle = {
        width: '36px',
        height: '36px',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontSize: '16px',
    };

    return (
        <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
            <button
                style={{ ...btnStyle, color: qty === 1 ? '#e53e3e' : 'inherit' }}
                onClick={() => changeQty(-1)}
            >
                {qty === 1 ? '🗑' : '−'}
            </button>

            <span style={{ minWidth: '32px', textAlign: 'center', fontSize: '15px', borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd', padding: '0 4px', userSelect: 'none' }}>
                {qty}
            </span>

            <button style={btnStyle} onClick={() => changeQty(+1)}>+</button>
        </div>
    );
}