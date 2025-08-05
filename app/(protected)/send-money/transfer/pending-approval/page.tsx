import { Fragment } from 'react';
import { MenuItem } from '@/config/types';
import { Container } from '@/components/common/container';
import { PageNavbar } from '@/app/components/partials/navbar/page-navbar';
import { menu } from '../const/const';
import { NetworkUserTableTeamCrewContent } from './content';

const PendingApproval = () => {
  return (
    <Fragment>
      <PageNavbar menu={menu} />
      <Container>
        <NetworkUserTableTeamCrewContent />
      </Container>
    </Fragment>
  );
};

export default PendingApproval;
