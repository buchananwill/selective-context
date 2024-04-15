import {GenericSelectiveContextProps, UseSelectiveContextListener, UseSelectiveContextParams} from "../../types";
import {useSelectiveContextListener} from "../base/use-selective-context-listener";

export default function getSelectiveContextListenerHook<T>({
  latestValueRefContext,
  listenerRefContext
}: GenericSelectiveContextProps<T>): UseSelectiveContextListener<T> {
  return ({
    contextKey,
    listenerKey,
    initialValue
  }: UseSelectiveContextParams<T>) => {
    const { currentState } = useSelectiveContextListener(
      contextKey,
      listenerKey,
      initialValue,
      listenerRefContext,
      latestValueRefContext
    );

    return { currentState };
  };
}
