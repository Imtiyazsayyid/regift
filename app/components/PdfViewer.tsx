import { Worker } from "@react-pdf-viewer/core";

import * as React from "react";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface DefaultLayoutExampleProps {
  fileUrl: string;
}

const DefaultLayoutExample: React.FC<DefaultLayoutExampleProps> = ({
  fileUrl,
}) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="h-[1000px] rounded-lg border overflow-hidden w-full">
      <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
        <Viewer
          fileUrl={fileUrl}
          plugins={[defaultLayoutPluginInstance]}
          theme={{
            theme: "dark",
          }}
        />
      </Worker>
    </div>
  );
};

export default DefaultLayoutExample;
