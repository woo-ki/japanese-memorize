import { customAlertStyle } from '@components/globals/CustomAlert/style.ts';
import { useAppStore } from '@hooks/useAppStore';

const CustomAlert = () => {
  const { confirmAlert, alertProps } = useAppStore('common');
  const overlayHandler = () => {
    const result = !alertProps.cancelButton;
    confirmAlert(result);
  };
  const confirmHandler = () => {
    confirmAlert(true);
  };
  const cancelHandler = () => {
    confirmAlert(false);
  };
  return (
    <div css={customAlertStyle} onClick={overlayHandler}>
      <div
        className="dialog-container"
        onClick={(e) => {
          e.stopPropagation(); // 클릭 이벤트 전파 막기
        }}
      >
        <div className="dialog-icon">⚠️</div>
        <div className="dialog-title">{alertProps.title}</div>
        <div className="dialog-message">{alertProps.message}</div>
        <div className="dialog-buttons">
          {alertProps.cancelButton && (
            <button className="dialog-button cancel-button" onClick={cancelHandler}>
              {alertProps.cancelButton}
            </button>
          )}
          <button className="dialog-button confirm-button" onClick={confirmHandler}>
            {alertProps.confirmButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
