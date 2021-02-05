import React from 'react';
import { Dialog, DialogContent, Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useRestaurant } from 'context';

const TermsDialog = (props) => {
  const { visible, onClose } = props;
  const { informations, loaded } = useRestaurant();
  const { name, representative, city, street, country } = informations;
  return (
    loaded && (
      <Dialog onClose={onClose} open={visible} scroll={'body'}>
        <DialogContent>
          <Typography gutterBottom variant={'h6'}>
            § 1 Geltungsbereich{' '}
          </Typography>
          <Typography gutterBottom variant={'body1'}>
            Diese allgemeinen Geschäftsbedingungen gelten für alle
            Geschäftsbeziehungen zwischen {name} und den Kunden in der
            jeweiligen, zum Zeitpunkt des Vertragsschlusses aktuellen Fassung.
            <br />
            <br />
          </Typography>
          <Typography gutterBottom variant={'h6'}>
            § 2 Zustandekommen des Vertrages
          </Typography>
          <Typography gutterBottom variant={'body1'}>
            (1) Der Verkauf von Waren erfolgt nur in haushaltsüblichen Mengen.
            Die Darstellung des Sortiments von {name} auf über das Internet
            abrufbaren Rechnern stellt kein Angebot i.S.d. §§ 145 ff. BGB dar,
            sondern eine unverbindliche Aufforderung an den Kunden, diese
            Produkte zu bestellen.
            <br />
            (2) Indem der Kunde ein Angebot absendet, gibt er ein Angebot auf
            Abschluss eines Kaufvertrages mit dem zuständigen Lieferanten ab.
            <br />
            (3) Der Kunde erhält eine Bestätigung des Empfangs der Bestellung
            per E-Mail, in der die Bestelldaten aufgeführt sind. Diese
            Bestelleingangsbestätigung stellt keine Annahme des Angebots dar,
            sondern soll den Kunden nur darüber informieren, dass die Bestellung
            eingegangen ist.
            <br />
            (4) Der Vertrag mit dem Lieferanten kommt zustande, wenn der
            Lieferant die Bestellung an der Haustür des Kunden abliefert. Kann
            der Lieferant die Lieferung nicht ausführen, wird der Kunde anstelle
            der Annahme der Bestellung über die Nichtverfügbarkeit informiert.
            <br />
            <br />
          </Typography>
          <Typography gutterBottom variant={'h6'}>
            § 3 Lieferung und Leistungen
          </Typography>
          <Typography gutterBottom variant={'body1'}>
            (1) Der Umfang der vertraglichen Leistungen ergibt sich aus der
            Bestellung.
            <br />
            (2) Der Lieferant behält sich vor, eine Lieferung abzulehnen, wenn
            die Lieferadresse außerhalb des gültigen Liefergebietes liegt, eine
            vorhergehende Bestellung des Kunden nicht ausgeführt werden konnte
            oder Kunde mangelnde Bonität aufweist.
            <br />
            <br />
          </Typography>
          <Typography gutterBottom variant={'h6'}>
            § 4 Preise
          </Typography>
          <Typography gutterBottom variant={'body1'}>
            Es gelten die jeweils aktuellen Preislisten auf der Webseite. Die
            Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer.
            <br />
            <br />
          </Typography>
          <Typography gutterBottom variant={'h6'}>
            § 5 Fälligkeit und Bezahlung
          </Typography>
          <Typography gutterBottom variant={'body1'}>
            (1) Mit der Bestellung werden unsere Lieferungs- und
            Zahlungsbedingungen anerkannt.
            <br />
            (2) Der Kaufpreis sowie die Lieferkosten werden mit der Lieferung
            fällig.
            <br />
            <br />
          </Typography>
          <Typography gutterBottom variant={'h6'}>
            § 6 Widerrufsrecht
          </Typography>
          <Typography gutterBottom variant={'body1'}>
            (1) Sie können Ihre Bestellungen per Internet, E-Mail, Telefon, Fax
            oder über sonstige Kommunikationswege widerrufen oder ändern. <br />
            Der Widerruf oder Änderungswünsche sind zu richten an: {name}{' '}
            {street}, {city} {country}
            <br />
            (2) Wir weisen ausdrücklich darauf hin, dass kein zweiwöchiges
            Widerrufsrecht trotz eines Fernabsatzvertrages besteht. Dieses ist
            bei schnell verderblicher Ware gemäß §312d IV Nr. 1 BGB
            ausgeschlossen.
            <br />
            <br />
          </Typography>
          <Typography gutterBottom variant={'h6'}>
            § 7 Gewährleistung
          </Typography>
          <Typography gutterBottom variant={'body1'}>
            (1) {name} wird für Mängel, die bei der Übergabe der Waren vorhanden
            sind, im Rahmen der gesetzlichen Bestimmungen einstehen.
            <br />
            (2) Bei falscher und/oder fehlerhafter Lieferung wird ausschließlich
            nach entsprechender Mitteilung eine Ersatzlieferung erbracht oder
            für die fehlende Ware eine Gutschrift geleistet. Ein Anspruch auf
            Nachlieferung besteht nicht. Generell sind alle Lebensmittel von der
            Rückgabe ausgeschlossen, soweit es sich nicht um einen Fall der
            Gewährleistung handelt.
            <br />
            (3) Beanstandungen bei erkennbaren Mängeln an der Ware, ausgefallene
            oder falsche bzw. fehlerhafte Lieferungen müssen {name} unverzüglich
            nach Kenntnisnahme angezeigt werden. Der Lieferant entscheidet, ob
            die Ware wieder abgeholt wird.
            <br />
            (4) Die Gefahr des Untergangs bzw. der Beschädigung der Ware geht
            mit der Ablage der Ware an der Haustür oder des vereinbarten
            Ablageortes auf den Kunden über.
            <br />
            <br />
          </Typography>
          <Typography gutterBottom variant={'h6'}>
            § 8 Haftung
          </Typography>
          <Typography gutterBottom variant={'body1'}>
            Für Schäden, die nachweislich auf die Auftragsführung zurückzuführen
            sind, haftet {name} und dessen Lieferanten nur dann, wenn Vorsatz
            oder grobe Fahrlässigkeit an der Entstehung des Schadens
            nachgewiesen werden kann. Hiervon ausgenommen sind Ansprüche wegen
            der Verletzung des Lebens, des Körpers und der Gesundheit, hier
            gelten die gesetzlichen Bestimmungen.
            <br />
            <br />
          </Typography>
          <Typography gutterBottom variant={'h6'}>
            § 9 Datenschutz
            <br />
          </Typography>
          <Typography gutterBottom variant={'body1'}>
            (1) {name} und dessen Partner verpflichtet sich, die
            personenbezogenen Daten der Kunden nach den datenschutzrechtlichen
            Bestimmungen vertraulich zu behandeln.
            <br />
            (2) Es wird darauf hingewiesen, dass die für die Geschäftsabwicklung
            notwendigen Daten, soweit im Rahmen des Bundesdatenschutzgesetzes (§
            26 BDSG) zulässig, gespeichert und im Rahmen der Bestellabwicklung
            gegebenenfalls an die mit {name} verbundenen Unternehmen
            (Kurierdienste) weitergegeben werden.
            <br />
            <br />
          </Typography>
          <Typography gutterBottom variant={'h6'}>
            § 10 Anbieter
          </Typography>
          <Typography gutterBottom variant={'body1'}>
            Anbieter dieser Webseite: {name} {street}, {city} {country}{' '}
            vertreten durch {representative}
            <br />
            <br />
          </Typography>
          <Typography gutterBottom variant={'h6'}>
            § 11 Schlussbestimmungen
          </Typography>
          <Typography gutterBottom variant={'body1'}>
            (1) Für die Rechtsbeziehungen zwischen den Kunden und {name} gilt
            deutsches Recht.
            <br />
            (2) Sollten eine oder mehrere Bestimmungen dieser allgemeinen
            Geschäftsbedingungen ganz oder teilweise unwirksam sein oder ihre
            Rechtswirksamkeit später verlieren, so wird hierdurch die
            Wirksamkeit der übrigen Geschäftsbedingungen nicht berührt.
            <br />
          </Typography>
          <Button
            className={'box-t'}
            color={'primary'}
            fullWidth
            onClick={onClose}
            size={'large'}
            variant={'contained'}>
            Zurück
          </Button>
        </DialogContent>
      </Dialog>
    )
  );
};

TermsDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
};

export default TermsDialog;
