import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes/crm.routes";
import SiteLoader from "../components/loader/site.loader";

const RouteComponent = () => {
  return (
    <Routes>
      {publicRoutes &&
        publicRoutes.map((route, idx) =>
          route.component ? (
            <Route
              key={idx}
              path={route.path}
              element={
                <Suspense fallback={<SiteLoader />}>
                  {route.component}
                </Suspense>
              }
            />
          ) : null
        )}
    </Routes>
  );
};

export default RouteComponent;
