import { popUpContextApi } from "./popUpContext";

const popUpContext: popUpContextApi = (window as any).electron_window?.popup;

export default popUpContext;