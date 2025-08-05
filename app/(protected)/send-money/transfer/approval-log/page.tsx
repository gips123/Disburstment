import { Fragment } from 'react';
import { Container } from '@/components/common/container';
import { PageNavbar } from '@/app/components/partials/navbar/page-navbar';
import { menu } from '../const/const';
import { NetworkUserTableTeamCrewContent } from './content';

const ApprovalLog = () => {
  return (
    <Fragment>
      <PageNavbar menu={menu} />
      <Container>
        <NetworkUserTableTeamCrewContent />
      </Container>
    </Fragment>
  );
};

export default ApprovalLog;
