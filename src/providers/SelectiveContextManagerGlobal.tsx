'use client';
import React, { PropsWithChildren } from "react";
import { SelectiveContextManagerGeneric } from "./SelectiveContextManagerGeneric";
import { SelectiveContextGlobal } from "../creators/selectiveContextCreatorGlobal";

export function SelectiveContextManagerGlobal({
  children,
}: PropsWithChildren) {
  return (
    <SelectiveContextManagerGeneric {...SelectiveContextGlobal}>
      {children}
    </SelectiveContextManagerGeneric>
  );
}