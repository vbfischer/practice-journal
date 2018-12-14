import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import DefaultTemplate from '../templates/DefaultTemplate';
import LoginForm from '../forms/LoginForm';

export default () => (
  <DefaultTemplate>
    <Card style={{ margin: '0 auto', maxWidth: '400px' }} raised>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  </DefaultTemplate>
);
