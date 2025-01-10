import { AnalyticsMetricsUC } from './analytics-metrics.usecase';
import { CreateUrlUC } from './create-url.usecase';
import { DeleteUrlUC } from './delete-url.usecase';
import { RedirectUrlUC } from './redirect-url.usecase';
import { UrlInfoUC } from './url-info.usecase';

export const providers = [
  AnalyticsMetricsUC,
  CreateUrlUC,
  DeleteUrlUC,
  RedirectUrlUC,
  UrlInfoUC,
];
