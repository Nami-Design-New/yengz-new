function BankTransferCard({ bank, bankTransfer, onChange, disabled }) {
  return (
    <div className="bank-transfer-box">
      <input
        type="radio"
        name="bank_id"
        id={bank?.id}
        value={bank?.id}
        checked={Number(bankTransfer) === Number(bank?.id)}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        disabled={disabled}
      />
      <label htmlFor={bank?.id}>
        <div className="image-wrapper">
          <i className="fa-sharp fa-regular fa-building-columns"></i>
        </div>
        <div className="info-wrapper">
          <h5>{bank?.user_name}</h5>
          <div className="info-boxes-wrapper">
            {(bank?.city || bank?.area) && (
              <div className="info-box">
                <span className="box-title">
                  <i className="fa-solid fa-location-dot"></i>
                </span>
                <span className="box-value">{`${
                  bank.city ? bank.city + "" : ""
                } ${bank.city && bank.area ? ", " : ""} ${
                  bank.area ? bank.area : ""
                }`}</span>
              </div>
            )}
            {(bank?.address1 || bank?.address2) && (
              <div className="info-box">
                <span className="box-title">
                  <i className="fa-regular fa-house"></i>
                </span>
                <span className="box-value">{`${
                  bank.address1 ? bank.address1 + "" : ""
                } ${bank.address2 && bank.address2 ? ", " : ""} ${
                  bank.address2 ? bank.address2 : ""
                }`}</span>
              </div>
            )}
            {bank?.iban && (
              <div className="info-box">
                <span className="box-title">
                  <i className="fa-regular fa-money-check"></i>
                </span>
                <span className="box-value">{bank.iban}</span>
              </div>
            )}
            {bank?.swift && (
              <div className="info-box">
                <span className="box-title">
                  <i className="fa-solid fa-globe"></i>
                </span>
                <span className="box-value">{bank.swift}</span>
              </div>
            )}
            {bank?.zip && (
              <div className="info-box">
                <span className="box-title">
                  <i className="fa-sharp fa-regular fa-envelopes-bulk"></i>
                </span>
                <span className="box-value">{bank.zip}</span>
              </div>
            )}
          </div>
        </div>
      </label>
    </div>
  );
}

export default BankTransferCard;
