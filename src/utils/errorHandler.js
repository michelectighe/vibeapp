// errorHandler.js

export function setGlobalErrorHandler() {
    const originalHandler = global.ErrorUtils.getGlobalHandler();

    global.ErrorUtils.setGlobalHandler((error, isFatal) => {
        console.log('🔥 Global Error Caught:', error.message);
        console.log(error.stack);

        if (isFatal) {
            console.log('🚨 Fatal Error Detected');
        } else {
            console.log('⚠️ Non-fatal error');
        }

        // Optionally, still call the original handler (to show red screen)
        if (originalHandler) {
            originalHandler(error, isFatal);
        }
    });
}
