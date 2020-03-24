import React from 'react';
import ReactDOM from "react-dom";
import ContextMenu, { ContextMenuItem } from "@components/context-menu";

export const createContextMenu = (e: React.MouseEvent | MouseEvent, items: ContextMenuItem[], onClose?: () => void) => {
  const el = document.createElement('div');
  el.style.position = 'fixed';
  el.style.top = '0';
  el.style.left = '0';
  el.style.zIndex = '999';
  const close = () => {
    onClose && onClose();
    ReactDOM.unmountComponentAtNode(el);
    el.remove();
  }
  ReactDOM.render((<ContextMenu pos={{ x: e.clientX, y: e.clientY }} items={items} onClose={close} />), el)
  document.body.appendChild(el);
}
