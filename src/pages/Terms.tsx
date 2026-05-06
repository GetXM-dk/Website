import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-6 py-24 md:py-32 max-w-4xl">
        <h1 className="display-lg mb-8">Handelsbetingelser</h1>
        
        <div className="prose prose-slate max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">1. Generelle oplysninger</h2>
            <p>
              Disse handelsbetingelser gælder for køb af ydelser hos GetXM (udbudt af Adler Jung).
              <br />
              CVR-nr: 34451648
              <br />
              Adresse: Emdrupvej 28A, 2100 København Ø
              <br />
              Email: hej@getxm.dk
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">2. Ydelser</h2>
            <p>
              GetXM leverer en softwareløsning til automatisering af ubesvarede opkald via SMS. Løsningen konfigureres specifikt til den enkelte kliniks behov som aftalt ved onboarding.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">3. Betaling og abonnement</h2>
            <p>
              GetXM tilbydes som en abonnementsløsning. Betaling sker månedsvis eller årligt forud, afhængigt af den valgte pakke. Alle priser er angivet ekskl. moms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">4. Opsigelse</h2>
            <p>
              Abonnementet kan opsiges løbende. Ved månedlig betaling er der ingen binding, og opsigelse sker til udgangen af den indeværende måned. Ved årlig betaling er abonnementet bindende i 12 måneder.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">5. Ansvar</h2>
            <p>
              GetXM fungerer som et tillæg til kundens eksisterende telefoni. GetXM er ikke ansvarlig for nedbrud i kundens eget teleselskab eller netværk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">6. Ændringer</h2>
            <p>
              GetXM forbeholder sig retten til at ændre disse betingelser med 30 dages varsel.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
