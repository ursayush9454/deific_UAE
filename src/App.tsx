import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "./hooks/ScrollToTop";
import { lazy, Suspense } from "react";
import "@fontsource/ibm-plex-sans-arabic/arabic-400.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-500.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-600.css";
import USA from "@/pages/USA";
import DigitalAgencyBlog from "@/Posts/DigitalAgency";
import TopItCompaniesBlog from "@/Posts/TopItCompanies";
import AiAgents from "@/pages/AiAgent";
import { CITIES, cityPath, INDIA_HUB_PATH } from "@/static/cities";
import { LanguageProvider } from "@/i18n/LanguageContext";
import ArabicAutoTranslate from "@/i18n/ArabicAutoTranslate";

// 👇 Sab pages ab lazy — direct import hata diya
const HomePage = lazy(() => import("@/pages/HomePage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const PortfolioPage = lazy(() => import("@/pages/PortfolioPage"));
const TechnologiesPage = lazy(() => import("@/pages/TechnologiesPage"));
const IndustriesPage = lazy(() => import("@/pages/IndustriesPage"));
const TeamPage = lazy(() => import("@/pages/TeamPage"));
const CareersPage = lazy(() => import("@/pages/CareersPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const ChatWidget = lazy(() => import("@/components/site/ChatWidget"));
const TermsAndCondition = lazy(() => import("@/pages/TermsAndCondition"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const ProductsPage = lazy(() => import("@/pages/ProductsPage"));
const ProductDetailPage = lazy(() => import("@/pages/ProductDetailPage"));
const CityPage = lazy(() => import("@/pages/CityPage"));
const IndiaHubPage = lazy(() => import("@/pages/IndiaHubPage"));
const PropAILanding = lazy(() => import("@/pages/PropAI"));

const PropAIPrivacy = lazy(() => import("@/pages/PropAIPrivacy"));
const PropAITerms = lazy(() => import("@/pages/PropAITerms"));
const PropAIDataDeletion = lazy(() => import("@/pages/PropAIDataDeletion"));

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </div>
  );
}

/** Routes without a router, so the same tree can be rendered on the server (prerender) and in the browser. */
export function AppRoutes() {
  return (
    <LanguageProvider>
      <ArabicAutoTranslate />
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <AboutPage />
              </Layout>
            }
          />
          <Route
            path="/services/:slug"
            element={
              <Layout>
                <ServicesPage />
              </Layout>
            }
          />
          <Route
            path="/products"
            element={
              <Layout>
                <ProductsPage />
              </Layout>
            }
          />
          <Route
            path="/products/:slug"
            element={
              <Layout>
                <ProductDetailPage />
              </Layout>
            }
          />
          <Route
            path="/portfolio"
            element={
              <Layout>
                <PortfolioPage />
              </Layout>
            }
          />
          <Route
            path="/technologies"
            element={
              <Layout>
                <TechnologiesPage />
              </Layout>
            }
          />
          <Route
            path="/industries"
            element={
              <Layout>
                <IndustriesPage />
              </Layout>
            }
          />
          <Route
            path="/team"
            element={
              <Layout>
                <TeamPage />
              </Layout>
            }
          />
          <Route
            path="/careers"
            element={
              <Layout>
                <CareersPage />
              </Layout>
            }
          />
          <Route
            path="/blog"
            element={
              <Layout>
                <BlogPage />
              </Layout>
            }
          />
          <Route
            path="/blog/how-to-choose-the-right-digital-agency"
            element={
              <Layout>
                <DigitalAgencyBlog />
              </Layout>
            }
          />
          <Route
            path="/blog/top-10-it-companies-in-india"
            element={
              <Layout>
                <TopItCompaniesBlog />
              </Layout>
            }
          />

          <Route
            path="/contact"
            element={
              <Layout>
                <ContactPage />
              </Layout>
            }
          />
          <Route
            path="/terms-and-condition"
            element={
              <Layout>
                <TermsAndCondition />
              </Layout>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <Layout>
                <PrivacyPolicy />
              </Layout>
            }
          />

          <Route
            path="/ai-agents"
            element={
              <Layout>
                <AiAgents />
              </Layout>
            }
          />

          <Route
            path="/usa"
            element={
              <Layout>
                <USA />
              </Layout>
            }
          />
          <Route
            path="/uae"
            element={
              <Layout>
                <HomePage variant="AE" />
              </Layout>
            }
          />
          <Route
            path="/uae/ar"
            element={
              <Layout>
                <HomePage variant="AE_AR" />
              </Layout>
            }
          />

          {/* India SEO: hub + one landing page per city (/software-company-in-<city>) */}
          <Route
            path={INDIA_HUB_PATH}
            element={
              <Layout>
                <IndiaHubPage />
              </Layout>
            }
          />
          {CITIES.map((c) => (
            <Route
              key={c.slug}
              path={cityPath(c.slug)}
              element={
                <Layout>
                  <CityPage slug={c.slug} />
                </Layout>
              }
            />
          ))}

          <Route path="/propai" element={<PropAILanding />} />

          <Route path="/propai/privacy-policy" element={<PropAIPrivacy />} />
          <Route path="/propai/terms" element={<PropAITerms />} />
          <Route
            path="/propai/data-deletion"
            element={<PropAIDataDeletion />}
          />

          <Route
            path="*"
            element={
              <Layout>
                <div className="flex items-center justify-center min-h-[50vh] text-center">
                  <div>
                    <h1 className="mb-4 text-4xl font-bold">404</h1>
                    <p className="text-muted-foreground">Page not found</p>
                  </div>
                </div>
              </Layout>
            }
          />
        </Routes>
      </Suspense>
    </LanguageProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
