import { SelectItem } from "~/components/ui";
import React from "react";

export default function SelectCompany({
  companyData,
}: {
  companyData: {
    id: string;
    name: string;
    email: string;
    password: string;
  };
}) {
  return (
    <>
      <SelectItem value={companyData.id} label={companyData.name} />
    </>
  );
}
