import { engineeringGuides } from './engineeringGuides';
import { projectExperiences } from './projectExperience';
import { engineeringTools } from './engineeringTools';
import { procurementGuide } from './procurementGuide';

export { engineeringGuides, projectExperiences, engineeringTools };
export const learningResources = [
  ...engineeringTools.map(item => ({ ...item, resourceType: 'Calculator' })),
  ...engineeringGuides.map(item => ({ ...item, resourceType: 'Engineering guide' })),
  { ...procurementGuide, resourceType: 'Buying guide' },
  ...projectExperiences.map(item => ({ ...item, resourceType: 'Project experience' })),
];

export function relatedResources({ servicePath, categoryId, excludePath } = {}) {
  const candidates = learningResources.filter(item => item.path !== excludePath);
  const current = learningResources.find(item => item.path === excludePath);
  const services = new Set([servicePath, ...(current?.relatedServicePaths || []), ...(current?.relatedLinks || []).map(link => link.path).filter(path => path.startsWith('/solutions/'))].filter(Boolean));
  const categories = new Set([categoryId, ...(current?.relatedCategoryIds || []), ...(current?.relatedLinks || []).map(link => link.path).filter(path => path.startsWith('/products/')).map(path => path.slice('/products/'.length))].filter(Boolean));
  if (!services.size && !categories.size) return candidates.filter(item => item.resourceType !== 'Project experience').slice(0, 4);
  return candidates.map(item => ({ item, score: (item.relatedServicePaths || []).filter(path => services.has(path)).length * 3 + (item.relatedCategoryIds || []).filter(id => categories.has(id)).length + (current?.relatedToolPaths?.includes(item.path) ? 4 : 0) }))
    .filter(({ score }) => score > 0).sort((a, b) => b.score - a.score).slice(0, 4).map(({ item }) => item);
}
