import PropTypes from 'prop-types';
import { Divider } from 'antd';
import 'antd/lib/divider/style/css';
import StyledCard from './StyledCard';
import StyledCardTime from './StyledCardTime';
import StyledLabel from './StyledLabel';
import StyledLabels from './StyledLabels';
import StyledCardTitle from './StyledCardTitle';
import StyledRepoName from './StyledRepoName';
import StyledValue from './StyledValue';
import StyledValueLabel from './StyledValueLabel';
import StyledButtonChallenge from './StyledButtonChallenge';
import StyledHeader from './StyledHeader';
import StyledFooter from './StyledFooter';
import Button from '../../Button';
import getTimeAgo from './timeago';
import Icon from '../../Icon';
import StyledCheckmark from './StyledCheckmark';
import StyledNotYetFunded from './StyledNotYetFunded';

const OrgName = 'MyBitFoundation';

const getValueLabel = (value, mybitInUsd, tokenSymbol, showAmountInCrypto, merged) =>
  (value > 0 ?
    <div style={{ marginTop: '16px' }}>
      <StyledValueLabel merged={merged}>
          Value
      </StyledValueLabel>
      <StyledValue merged={merged}>
        {
          showAmountInCrypto ?
            `${Number(value.toFixed(2)).toLocaleString()} ${tokenSymbol}` :
            `$${Number(mybitInUsd).toLocaleString()}`
        }
      </StyledValue>
    </div>
    :
    <StyledNotYetFunded>
      <p>Not yet funded</p>
    </StyledNotYetFunded>);


const generateLabels = labels => (
  <StyledLabels>
    {labels.map(label => (
      <StyledLabel key={label}>
        <Divider type="vertical" />{' '}{label}
      </StyledLabel>
    ))}
  </StyledLabels>
);

const getTimeLabel = time => (
  <StyledCardTime>
    {getTimeAgo(time)}
  </StyledCardTime>
);

const Card = ({
  title,
  labels,
  repoName,
  repoUrl,
  value,
  mybitInUsd,
  createdAt,
  url,
  styling,
  merged,
  tokenSymbol,
  showAmountInCrypto,
}) => (
  <StyledCard>
    <StyledHeader>
      <div>
        {merged && (
          <StyledCheckmark>
            <Icon type="check" />
          </StyledCheckmark>
        )}
        <StyledCardTitle merged={merged}>
          {title}
        </StyledCardTitle>
        {generateLabels(labels)}
      </div>
      <div>
        {getTimeLabel(createdAt)}
      </div>
    </StyledHeader>
    <StyledRepoName
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      merged={merged}
    >
      {`${OrgName}/${repoName}`}
    </StyledRepoName>
    <StyledFooter>
      {getValueLabel(value, mybitInUsd, tokenSymbol, showAmountInCrypto, merged)}
      {!merged &&
        <StyledButtonChallenge>
          <Button
            styling={styling.primary.blue}
            size="large"
            href={url}
          >
            Accept Challenge
          </Button>
        </StyledButtonChallenge>
      }
    </StyledFooter>
  </StyledCard>
);

Card.propTypes = {
  styling: PropTypes.object.isRequired, //eslint-disable-line
  title: PropTypes.string.isRequired,
  repoName: PropTypes.string.isRequired,
  repoUrl: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  labels: PropTypes.array.isRequired, // eslint-disable-line
  tokenSymbol: PropTypes.string.isRequired,
  merged: PropTypes.bool.isRequired,
  showAmountInCrypto: PropTypes.bool.isRequired,
  mybitInUsd: PropTypes.string.isRequired,
};

export default Card;
