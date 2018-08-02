import * as Reactstrap from "reactstrap";

export const Components = {

}
export default function getComponent(componentName: string) {
    if (Components[componentName])
        return Components[componentName];
    else if (Reactstrap[componentName])
        return Reactstrap[componentName];
    else return componentName;
}; 