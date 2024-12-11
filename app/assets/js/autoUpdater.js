const { autoUpdater } = require('electron-updater');
const { dialog } = require('electron');

// 디버그 로깅 활성화
autoUpdater.logger = require('electron-log');
autoUpdater.logger.transports.file.level = 'info';

// 업데이트 확인 간격 (4시간)
const UPDATE_CHECK_INTERVAL = 4 * 60 * 60 * 1000;

// 업데이트 이벤트 처리
autoUpdater.on('update-available', (info) => {
    dialog.showMessageBox({
        type: 'info',
        title: '업데이트 알림',
        message: '새로운 버전이 있습니다. 자동으로 다운로드를 시작합니다.',
        buttons: ['확인']
    });
});

autoUpdater.on('update-downloaded', (info) => {
    dialog.showMessageBox({
        type: 'info',
        title: '업데이트 준비 완료',
        message: '업데이트가 다운로드되었습니다. 런처를 재시작하여 업데이트를 적용하시겠습니까?',
        buttons: ['재시작', '나중에']
    }).then((returnValue) => {
        if (returnValue.response === 0) {
            autoUpdater.quitAndInstall();
        }
    });
});

// 에러 처리
autoUpdater.on('error', (err) => {
    dialog.showErrorBox('Error', '업데이트 중 오류가 발생했습니다: ' + err);
});

// 업데이트 확인 함수
function checkForUpdates() {
    autoUpdater.checkForUpdates().catch(err => {
        console.error('Update check failed:', err);
    });
}

// 주기적으로 업데이트 확인
setInterval(checkForUpdates, UPDATE_CHECK_INTERVAL);

// 초기 업데이트 확인
setTimeout(checkForUpdates, 10000); // 앱 시작 10초 후 첫 확인

module.exports = {
    checkForUpdates
};
