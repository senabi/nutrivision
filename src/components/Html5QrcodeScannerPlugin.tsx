/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Html5QrcodeScanner,
  QrcodeSuccessCallback,
  QrcodeErrorCallback,
} from "html5-qrcode";
import { type Html5QrcodeScannerConfig } from "html5-qrcode/esm/html5-qrcode-scanner";
import { useEffect } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props: {
  fps: number;
  qrbox: number;
  aspectRatio: number;
  disableFlip: boolean;
}): Html5QrcodeScannerConfig => {
  const config: Html5QrcodeScannerConfig = {
    fps: 0,
  };
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Html5QrcodePlugin = (props: {
  config: {
    fps: number;
    qrbox: number;
    disableFlip: boolean;
    aspectRatio: number;
  };
  qrCodeSuccessCallback: QrcodeSuccessCallback;
  qrCodeErrorCallback: QrcodeErrorCallback;
}) => {
  useEffect(() => {
    // when component mounts
    const config: Html5QrcodeScannerConfig = createConfig(props.config);
    const verbose = false;
    // Suceess callback is required.
    if (!props.qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required callback.";
    }
    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose,
    );
    html5QrcodeScanner.render(
      props.qrCodeSuccessCallback,
      props.qrCodeErrorCallback,
    );

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []);

  return <div id={qrcodeRegionId} />;
};
