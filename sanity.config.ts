'use client';

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/cms/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { apiVersion, dataset, projectId } from './sanity/env';
import { schemaTypes } from './sanity/schemas';
import { structure } from './sanity/structure';

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works

export default defineConfig({
  name: 'default',
  title: 'Holicraft Studio',
  projectId,
  dataset,
  basePath: '/cms',
  plugins: [deskTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: schemaTypes as any,
  },
});
