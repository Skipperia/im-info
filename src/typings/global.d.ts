export { };

declare global {
    interface Window {
        electron: {
            receiveMessage: (channel: string, func: (data: any) => void) => void;
            setAdvancedView: (channel: string, func: () => void) => void;
        };
    }
}