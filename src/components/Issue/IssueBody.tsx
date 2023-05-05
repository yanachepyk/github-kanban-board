import { IssueLabel } from '../../redux/dashboard/dashboard.model';
import { KandanTooltip } from '../../shared/components/Tooltip';
import { getTextColor } from '../../shared/utils/styles/dynamicTextColor';
import { IssueBodyStyled, IssueLabelStyled } from './Issue.styled';

interface IssueBodyProps {
  labels: IssueLabel[];
}

const IssueBody = ({ labels }: IssueBodyProps) => {
  return (
    <IssueBodyStyled>
      {labels.map((label: any) =>
        label.description ? (
          <KandanTooltip key={label.id} tooltip={label.description}>
            <IssueLabelStyled
              bgColor={label.color}
              textColor={getTextColor(label.color)}
            >
              {label.name}
            </IssueLabelStyled>
          </KandanTooltip>
        ) : (
          <IssueLabelStyled
            key={label.id}
            bgColor={label.color}
            textColor={getTextColor(label.color)}
          >
            {label.name}
          </IssueLabelStyled>
        )
      )}
    </IssueBodyStyled>
  );
};

export default IssueBody;
