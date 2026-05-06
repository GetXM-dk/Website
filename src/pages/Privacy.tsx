import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-6 py-24 md:py-32 max-w-4xl">
        <h1 className="display-lg mb-8">Privatlivspolitik</h1>
        
        <div className="prose prose-slate max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">1. Dataansvarlig</h2>
            <p>
              Adler Jung (GetXM) er dataansvarlig for behandlingen af de personoplysninger, som vi modtager om dig.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">2. Formål med behandling</h2>
            <p>
              Vi behandler oplysninger for at kunne levere vores service, herunder opfølgning på ubesvarede opkald via SMS, samt for at kunne administrere kundeforholdet og fakturering.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">3. Typer af oplysninger</h2>
            <p>
              Vi behandler typisk navn, telefonnummer og emailadresse på kunden (klinikken) samt telefonnummer på de patienter, der ringer forgæves til klinikken, med henblik på at sende en opfølgende SMS.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">4. Sikkerhed</h2>
            <p>
              Vi har truffet tekniske og organisatoriske foranstaltninger mod, at dine oplysninger hændeligt eller ulovligt bliver slettet, offentliggjort, fortabt, forringet eller kommer til uvedkommendes kendskab, misbruges eller i øvrigt behandles i strid med lovgivningen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">5. Dine rettigheder</h2>
            <p>
              Du har efter databeskyttelsesforordningen en række rettigheder i forhold til vores behandling af oplysninger om dig, herunder ret til indsigt, ret til berigtigelse og ret til sletning.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">6. Kontakt</h2>
            <p>
              Hvis du har spørgsmål til vores behandling af dine oplysninger, er du altid velkommen til at kontakte os på hej@getxm.dk.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
