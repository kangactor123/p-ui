var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import styled from '@emotion/styled';
import { useCallback } from 'react';
var Wrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n"], ["\n  width: 100%;\n  height: 100%;\n"])));
function DndFile(_a) {
    var onDropProp = _a.onDrop, children = _a.children;
    var onDrop = useCallback(function (e) {
        var _a;
        // Note: See https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
        e.preventDefault();
        // No file...
        if (!e.dataTransfer)
            return;
        var file;
        if (e.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            if (((_a = e.dataTransfer.items[0]) === null || _a === void 0 ? void 0 : _a.kind) === 'file') {
                // If dropped items aren't files, reject them
                file = e.dataTransfer.items[0].getAsFile();
            }
        }
        else {
            // Use DataTransfer interface to access the file(s)
            if (e.dataTransfer.files[0]) {
                file = e.dataTransfer.files[0];
            }
        }
        // No file...
        if (!file)
            return;
        onDropProp(file);
    }, [onDropProp]);
    return (
    // <Wrapper onDrop={onDrop} onDragOver={dragOverHandler}>
    _jsx(Wrapper, { children: children }));
}
function dragOverHandler(ev) {
    ev.preventDefault();
}
export default DndFile;
var templateObject_1;
