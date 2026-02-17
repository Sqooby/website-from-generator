/**
 * Cloudflare Pages Deployment Helper
 *
 * Thin adapter layer between route handlers and the deployment service.
 * No business logic, no database access - delegates to deploymentService.
 *
 * For static HTML deployment (alternative), see deploy.ts
 */

import { deploymentService } from '@/server/services/deployment.service'

export async function verifyCloudflarePagesDeployment(websiteId: string) {
  return deploymentService.verify(websiteId)
}

export async function triggerCloudflarePagesRebuild() {
  return deploymentService.triggerRebuild()
}
