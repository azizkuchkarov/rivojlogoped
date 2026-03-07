import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getInstructorsTeam } from "@/lib/instructor";

export const metadata = {
  title: "Instruktorlar jamoasi | Rivoj Logoped",
  description: "Rivoj markazi mutaxassislari — Logoped, ABA, Sensor integratsiya, Defektolog.",
};

export default async function InstruktorlarPage() {
  const team = await getInstructorsTeam();

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen">
        <section className="py-16 gradient-mesh">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
              Instruktorlar jamoasi bilan tanishing
            </h1>
            <p className="text-stone-600 mt-4 max-w-2xl mx-auto">
              Rivoj markazida bolangizga yordam beradigan tajribali mutaxassislar.
            </p>
          </div>
        </section>
        <section className="py-16 bg-stone-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {team.length === 0 ? (
              <p className="text-center text-stone-500 py-12">
                Hozircha jamoа aʼzolari haqida maʼlumot qoʻshilmagan.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {team.map((member) => (
                  <article
                    key={member.id}
                    className="bg-white rounded-2xl border border-stone-200 overflow-hidden card-hover"
                  >
                    <div className="aspect-[4/3] bg-primary-100 relative">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-primary-300">
                          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-semibold text-stone-900">
                        {member.name}
                      </h3>
                      <p className="text-primary-600 font-medium text-sm mt-1">{member.role}</p>
                      <p className="text-stone-600 mt-3 text-sm leading-relaxed line-clamp-4">
                        {member.bio}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
