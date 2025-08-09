import { Button, Typography } from "@components/general";
import {
  ReadyToSell,
  ServiceBookingForm,
  Testimonials,
} from "@services/user/components";
import { acRepairTestimonials } from "@services/user/data";

export const Catering = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <section
        className="relative min-h-[600px] flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCN0DXvaVDx-c3DV9BJriTkVqXyWKYAaigKJZg9v07DSCpqL5mZYjq11Wc4woNJwA39A8EKCs_fWxWbw5Bxjo4Ea7AWUHV6K_JRvSNlZ4DgoTK3W1KzdomuTBIfghlxN011R-QfNxKEpxa3lVeEaLtuPza18oLvxwKG2YUaVNLTr2tSaYWt1ij-OI26xu28tZvpYZmM2qaCRuesaj0CcFxaxO4suHPA8xfXSM7IhG3GEvV3wWEGFPDcOOwzqxqijXUafWTGm4eW57M")',
        }}
      >
        <div className="z-10 flex flex-col items-center gap-6 p-8 max-w-3xl">
          <Typography variant="h1" color="text-white">
            Exquisite Catering for Every Occasion
          </Typography>
          <Typography variant="h6" color="text-white">
            Elevate your event with our bespoke catering services, tailored to
            your taste and style.
          </Typography>
          <Button variant="instanthub">Request a Quote</Button>
        </div>
      </section>
      <section className="py-24 px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Typography variant="h1">Our Catering Services</Typography>
            <Typography variant="h6">
              From intimate gatherings to grand celebrations.
            </Typography>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-[var(--c-gold)]">
                <div
                  className="bg-center bg-no-repeat w-full h-full bg-cover"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAcG2OMCwagiLrXiW5JkZVQppg6D7LQURh06CvXteqaes-OG_mP67RohWn1rQyr0luhd103CtoiUVkdFt_af_owcbkGVMbFSe_fH_MjNAMNQMMAG2kSpn35NUeLCQ6RyaEg_1P6N6xFpY60lsyCFbmhBYE-nODwrswenztHLBuiYvuOyV9IB85nyxcL1SkvknStbPgs6atA5kyT6HikoncVxgKoaWD5ZAJCPreBViGdf_geqvNJu6JHTShX6kvYDxYAdhTiBE8GPu8")',
                  }}
                ></div>
              </div>
              <h3 className="text-2xl font-bold text-[var(--c-dark-text)] mb-2">
                Weddings
              </h3>
              <p className="text-base font-normal">
                Create unforgettable memories with our bespoke wedding catering
                services.
              </p>
            </div>
            <div className="text-center flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-[var(--c-gold)]">
                <div
                  className="bg-center bg-no-repeat w-full h-full bg-cover"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBLMJq4KdjzHveJESK36ywFy_L63Feb2G3l1mOMP9TVir1A7spO-H8lr42uyET9ofSVB4MvC3SZkQWbzeB81toFTqzWFqtQ0ZIOD3OrQnRLMghb2J-vS64Vpk_--tpdcvlJz-auJzQUw-4jPHdYrEwDFUeNHvASNaReDd8emYkviDLkV3jOrGGpKCLJ8kd_rHm5P-Ha2_2FhT5k5W4thUTY--FA5WI3AsXURGqIZqKkdvatMK2UFHRQ76wDeRqK1nnDiOQqttIUDQo")',
                  }}
                ></div>
              </div>
              <h3 className="text-2xl font-bold text-[var(--c-dark-text)] mb-2">
                Corporate Events
              </h3>
              <p className="text-base font-normal">
                Impress your clients and colleagues with our professional
                corporate event catering.
              </p>
            </div>
            <div className="text-center flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-[var(--c-gold)]">
                <div
                  className="bg-center bg-no-repeat w-full h-full bg-cover"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDOYZOzzgHwQwZHd76QfSXPA15_LL40D1b6PvTKdAZ2y7LAoSUm5j5nbi-M6QM3MF6uKdQzb2QSvFc4EBVeQM7NFkPjXZVaPklGG24T8O-iUOQCOMn1PPlcdnWuj8VAMB7MxINYSVe8UVsQiUp1EwRDuicH9jTidwOModGI-5ai4czRCoye3BWRUKSi5c7_QBpifJsk-xG1U5sl3fm-9shhNX2DvXbDFwJH-baenCEYUXJjnCZFwFQ2ttRSWpmXXONHWaIa-rF8FrA")',
                  }}
                ></div>
              </div>
              <h3 className="text-2xl font-bold text-[var(--c-dark-text)] mb-2">
                Private Parties
              </h3>
              <p className="text-base font-normal">
                Host the perfect gathering with our personalized private party
                catering solutions.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 px-10 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div
              className="w-full aspect-square bg-cover rounded-xl shadow-lg"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCPeefohttPjqDX9Gpj9cI9vBMV3HR0MiSKK3kb2zkrLgcrVsoC8WGswHCO6g86sNPzvYn6BvaTZw1Oo0GYeEfq6ysxdBvbA8ZeuQ6qOzHLvtzX0b1pCpfcT6N-6GqO3RcXbK6DDvb55e6AigC34-SbU5361RhNKq5h8pIwfdx-fKqySQwmz42IpjrDjXLGOvnKsHKRQvxS4y27kfOtkcr74LPrgubGvfps3WQ3HNN6eBuYsV9GyAEcI1jFJBXsVSbOywD1twPBT08")',
              }}
            ></div>
          </div>
          <div className="lg:w-1/2 text-left">
            <h2 className="text-4xl font-bold text-[var(--c-dark-text)] mb-6">
              Diverse Culinary Selections
            </h2>
            <p className="text-lg mb-4">
              Explore our extensive menu options, crafted with the finest
              ingredients. We cater to all dietary needs, including vegetarian,
              vegan, and gluten-free.
            </p>
            <p className="text-lg mb-8">
              Our menus feature a wide range of culinary delights, from classic
              dishes to innovative creations. We offer customizable options to
              suit your preferences and dietary needs.
            </p>
            <button className="btn-secondary rounded-full h-12 px-8 text-base font-bold">
              View Sample Menus
            </button>
          </div>
        </div>
      </section>

      <Testimonials data={acRepairTestimonials} />

      <ReadyToSell
        title="Ready to Plan Your Event?"
        subTitle="Contact us today to discuss your catering needs and let us help you create an unforgettable experience."
      >
        <Button variant="instanthub">Book Now</Button>
      </ReadyToSell>

      {/* <ServiceBookingForm /> */}
    </div>
  );
};
