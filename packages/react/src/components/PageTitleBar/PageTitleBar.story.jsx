import React from 'react';
import { action } from '@storybook/addon-actions';
import { Add24, TrashCan24 } from '@carbon/icons-react';
import { spacing05 } from '@carbon/layout';
import { Tabs, Tab } from 'carbon-components-react';

import FullWidthWrapper from '../../internal/FullWidthWrapper';
import Button from '../Button';

import PageTitleBar from './PageTitleBar';

export const commonPageTitleBarProps = {
  title: 'Page title',
  description: 'Descriptive text about this page and what the user can or should do on it',
  extraContent: (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: spacing05 }}>
        <b>Last updated:</b> yesterday
      </span>
      <Button className="some-right-content" renderIcon={Add24} onClick={action('click')}>
        Take an action
      </Button>
    </div>
  ),
};

export const pageTitleBarBreadcrumb = [
  <a href="/">Home</a>,
  <a href="/">Type</a>,
  <span>Instance</span>,
];

export const PageTitleBarNodeTooltip = () => (
  <div>
    <p>Descriptive text about this page and what the user can or should do on it </p>
    <div
      style={{
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'space-between',
        'padding-top': spacing05,
      }}
    >
      <a href="/">Link one</a>
      <Button renderIcon={Add24} onClick={action('click')}>
        Take an action
      </Button>
    </div>
  </div>
);

export default {
  title: 'Watson IoT/PageTitleBar',
  decorators: [(storyFn) => <FullWidthWrapper>{storyFn()}</FullWidthWrapper>],

  parameters: {
    component: PageTitleBar,
  },

  excludeStories: ['commonPageTitleBarProps', 'pageTitleBarBreadcrumb', 'PageTitleBarNodeTooltip'],
};

export const Base = () => <PageTitleBar title={commonPageTitleBarProps.title} />;

Base.story = {
  name: 'base',
};

export const WithBreadcrumb = () => (
  <PageTitleBar title={commonPageTitleBarProps.title} breadcrumb={pageTitleBarBreadcrumb} />
);

WithBreadcrumb.story = {
  name: 'with breadcrumb',
};

export const WithDescription = () => (
  <PageTitleBar
    title={commonPageTitleBarProps.title}
    description={commonPageTitleBarProps.description}
  />
);

WithDescription.story = {
  name: 'with description',
};

export const WithTooltipDescriptionWithNode = () => (
  <PageTitleBar
    title={commonPageTitleBarProps.title}
    description={<PageTitleBarNodeTooltip />}
    breadcrumb={pageTitleBarBreadcrumb}
    collapsed
  />
);

WithTooltipDescriptionWithNode.story = {
  name: 'with tooltip description with node',
};

export const WithContent = () => (
  <PageTitleBar
    title={commonPageTitleBarProps.title}
    description={commonPageTitleBarProps.description}
    breadcrumb={pageTitleBarBreadcrumb}
    content={
      <Tabs>
        <Tab label="Tab 1">
          <div>Content for first tab.</div>
        </Tab>
        <Tab label="Tab 2">
          <div>Content for second tab.</div>
        </Tab>
        <Tab label="Tab 3">
          <div>Content for third tab.</div>
        </Tab>
      </Tabs>
    }
  />
);

WithContent.story = {
  name: 'with content',
};

export const WithEditableTitleBar = () => (
  <PageTitleBar
    title={commonPageTitleBarProps.title}
    description={commonPageTitleBarProps.description}
    editable
    onEdit={action('edit')}
  />
);

WithEditableTitleBar.story = {
  name: 'with editable title bar',
};

export const WithRichContent = () => <PageTitleBar {...commonPageTitleBarProps} collapsed />;

WithRichContent.story = {
  name: 'with rich content',
};

export const WithEverything = () => (
  <PageTitleBar
    title={commonPageTitleBarProps.title}
    description={commonPageTitleBarProps.description}
    breadcrumb={pageTitleBarBreadcrumb}
    extraContent={
      <div>
        <div
          className="top"
          style={{
            marginBottom: '8px',
            display: 'flex',
            flexDirection: 'row-reverse',
          }}
        >
          <span>Last updated: yesterday</span>
        </div>
        <div className="bottom">
          <Button
            renderIcon={Add24}
            onClick={action('click')}
            size="field"
            hasIconOnly
            iconDescription="Add"
            kind="ghost"
            tooltipPosition="bottom"
            tooltipAlignment="center"
          />
          <Button
            renderIcon={TrashCan24}
            onClick={action('click')}
            size="field"
            hasIconOnly
            iconDescription="Remove"
            kind="ghost"
            tooltipPosition="bottom"
            tooltipAlignment="center"
          />
          <Button onClick={action('click')} size="field">
            Take an action
          </Button>
        </div>
      </div>
    }
    editable
    content={
      <Tabs>
        <Tab label="Tab 1">
          <div>Content for first tab.</div>
        </Tab>
        <Tab label="Tab 2">
          <div>Content for second tab.</div>
        </Tab>
        <Tab label="Tab 3">
          <div>Content for third tab.</div>
        </Tab>
      </Tabs>
    }
    onEdit={action('edit')}
  />
);

WithEverything.story = {
  name: 'with everything',
};

export const IsLoading = () => <PageTitleBar title={commonPageTitleBarProps.title} isLoading />;

IsLoading.story = {
  name: 'isLoading',
};
