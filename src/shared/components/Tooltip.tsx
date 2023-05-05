import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ReactElement } from 'react';

type KanbanTooltipProps = {
  id?: string;
  children: any | any[];
  tooltip: string;
};

export const KandanTooltip = ({
  id,
  children,
  tooltip,
}: KanbanTooltipProps): ReactElement => (
  <OverlayTrigger
    placement="auto"
    delay={{ show: 250, hide: 100 }}
    overlay={<Tooltip id={id}>{tooltip}</Tooltip>}
  >
    {children}
  </OverlayTrigger>
);
