import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Add new routes here as the app grows
const routeLabels = {
  departments: "Departments",
  surveys: "Surveys",
  createForm: "Create Form",
  survey: "Survey",
};

export default function AppBreadcrumb() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Build breadcrumb items from the URL, pairing segments with their IDs
  const items = [];
  let i = 0;
  let accumulatedPath = "";

  while (i < pathSegments.length) {
    const segment = pathSegments[i];
    const next = pathSegments[i + 1];
    const hasId = next && !isNaN(next);

    accumulatedPath += `/${segment}`;
    if (hasId) {
      accumulatedPath += `/${next}`;
      i += 2;
    } else {
      i += 1;
    }

    items.push({
      label: routeLabels[segment] || segment,
      path: accumulatedPath,
    });
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Home is always "Organizations" */}
        <BreadcrumbItem>
          {items.length === 0 ? (
            <BreadcrumbPage>Organizations</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link to="/">Organizations</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {items.map((item, index) => (
          <span key={item.path} className="contents">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {index === items.length - 1 ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={item.path}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </span>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
