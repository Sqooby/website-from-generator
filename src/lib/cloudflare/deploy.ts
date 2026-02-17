/**
 * Cloudflare KV Deployment Helper
 *
 * Thin adapter layer for the static HTML deployment approach.
 * Delegates to deploymentService - no business logic here.
 */

import { deploymentService } from '@/server/services/deployment.service'

export async function deployToCloudflare(websiteId: string) {
  return deploymentService.deployToKv(websiteId)
}
