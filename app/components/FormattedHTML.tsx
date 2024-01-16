import React from "react";

interface Props {
  value: string | TrustedHTML;
}

const FormattedHTML = ({ value }: Props) => {
  return (
    <pre
      style={{
        fontFamily: "poppins",
        whiteSpace: "pre-wrap",
        // Add other styles as needed
      }}
      dangerouslySetInnerHTML={{
        __html: value || "-",
      }}
    />
  );
};

export default FormattedHTML;
