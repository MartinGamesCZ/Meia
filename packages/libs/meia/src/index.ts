import { MeiaApplication } from "./classes/application/Application";
import { MeiaWebviewWidget } from "./classes/widgets/WebviewWidget";
import { MeiaWindow } from "./classes/window/Window";

const Application = MeiaApplication.instance;
const Window = MeiaWindow;

const Widgets = {
  Webview: MeiaWebviewWidget,
};

const Meia = {
  Application: Application,
  Window: Window,
  Widgets: Widgets,
};

export { Application, Window, Widgets };
export default Meia;
