// ESSENZA MOTORS — client-side i18n. No external translation service: every
// string below is hand-translated and shipped with the site. Two dictionaries:
// UI  = static interface copy, looked up by key via data-i18n attributes.
// VAL = the finite set of vehicle-data words/phrases (color, drivetrain,
//       status, etc.) that appear inside ESSENZA_INVENTORY, looked up by
//       their exact Spanish source string. A value with no translation for
//       the active language just falls back to Spanish — this only affects
//       vehicles added later without a matching entry here.
const ESSENZA_LANGS = [
  { code: 'es', name: 'Español' },
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'ru', name: 'Русский' },
  { code: 'it', name: 'Italiano' },
];

const ESSENZA_UI = {
  'nav.inventario': { es: 'Inventario', en: 'Inventory', de: 'Fahrzeuge', fr: 'Inventaire', ru: 'Автопарк', it: 'Inventario' },
  'nav.agenda': { es: 'Agenda una experiencia', en: 'Book an experience', de: 'Termin vereinbaren', fr: 'Réserver une expérience', ru: 'Записаться на визит', it: 'Prenota un’esperienza' },
  'nav.openMenu': { es: 'Abrir menú', en: 'Open menu', de: 'Menü öffnen', fr: 'Ouvrir le menu', ru: 'Открыть меню', it: 'Apri il menu' },
  'nav.lang': { es: 'Idioma', en: 'Language', de: 'Sprache', fr: 'Langue', ru: 'Язык', it: 'Lingua' },

  'showroom.eyebrow': { es: 'Bienvenido al showroom', en: 'Welcome to the showroom', de: 'Willkommen im Showroom', fr: 'Bienvenue au showroom', ru: 'Добро пожаловать в шоурум', it: 'Benvenuti nello showroom' },
  'showroom.title': { es: 'Cada vehículo, seleccionado por obsesión al detalle.', en: 'Every vehicle, chosen with an obsession for detail.', de: 'Jedes Fahrzeug — mit Besessenheit fürs Detail ausgewählt.', fr: 'Chaque véhicule, choisi avec une obsession du détail.', ru: 'Каждый автомобиль отобран с одержимостью к деталям.', it: 'Ogni veicolo, scelto con un’ossessione per il dettaglio.' },
  'showroom.stat1': { es: 'Vehículos seleccionados', en: 'Curated vehicles', de: 'Ausgewählte Fahrzeuge', fr: 'Véhicules sélectionnés', ru: 'Отобранных автомобилей', it: 'Veicoli selezionati' },
  'showroom.stat2': { es: 'Marcas premium', en: 'Premium brands', de: 'Premium-Marken', fr: 'Marques premium', ru: 'Премиальных брендов', it: 'Marchi premium' },
  'showroom.stat3': { es: 'Años de experiencia', en: 'Years of experience', de: 'Jahre Erfahrung', fr: 'Années d’expérience', ru: 'Лет опыта', it: 'Anni di esperienza' },
  'showroom.stat4': { es: 'Calificación · 100 opiniones', en: 'Rating · 100 reviews', de: 'Bewertung · 100 Rezensionen', fr: 'Note · 100 avis', ru: 'Рейтинг · 100 отзывов', it: 'Valutazione · 100 recensioni' },

  'inventory.eyebrow': { es: 'Catálogo', en: 'Catalog', de: 'Katalog', fr: 'Catalogue', ru: 'Каталог', it: 'Catalogo' },
  'inventory.title': { es: 'Inventario premium', en: 'Premium inventory', de: 'Premium-Inventar', fr: 'Inventaire premium', ru: 'Премиальный автопарк', it: 'Inventario premium' },
  'inventory.filterMarca': { es: 'Marca', en: 'Make', de: 'Marke', fr: 'Marque', ru: 'Марка', it: 'Marca' },
  'inventory.filterTipo': { es: 'Tipo', en: 'Type', de: 'Typ', fr: 'Type', ru: 'Тип', it: 'Tipo' },
  'inventory.filterPrecio': { es: 'Precio', en: 'Price', de: 'Preis', fr: 'Prix', ru: 'Цена', it: 'Prezzo' },
  'inventory.filterDisponibilidad': { es: 'Disponibilidad', en: 'Availability', de: 'Verfügbarkeit', fr: 'Disponibilité', ru: 'Наличие', it: 'Disponibilità' },
  'inventory.precioHasta': { es: 'Hasta $1.5M', en: 'Up to $1.5M', de: 'Bis $1.5M', fr: 'Jusqu’à 1,5 M$', ru: 'До $1.5M', it: 'Fino a $1.5M' },
  'inventory.precioRango': { es: '$1.5M – $3M', en: '$1.5M – $3M', de: '$1.5M – $3M', fr: '1,5 M$ – 3 M$', ru: '$1.5M – $3M', it: '$1.5M – $3M' },
  'inventory.precioMas': { es: '$3M+', en: '$3M+', de: '$3M+', fr: '3 M$+', ru: '$3M+', it: '$3M+' },
  'inventory.empty': { es: 'No hay vehículos que coincidan con estos filtros por ahora. Escríbenos por WhatsApp y te avisamos en cuanto ingrese uno.', en: 'No vehicles match these filters right now. Message us on WhatsApp and we’ll let you know as soon as one comes in.', de: 'Derzeit passt kein Fahrzeug zu diesen Filtern. Schreiben Sie uns auf WhatsApp — wir melden uns, sobald eines eintrifft.', fr: 'Aucun véhicule ne correspond à ces filtres pour le moment. Écrivez-nous sur WhatsApp, nous vous préviendrons dès qu’un véhicule arrive.', ru: 'Сейчас нет автомобилей, подходящих под эти фильтры. Напишите нам в WhatsApp — сообщим, как только появится подходящий.', it: 'Al momento nessun veicolo corrisponde a questi filtri. Scrivici su WhatsApp e ti avviseremo appena ne arriva uno.' },
  'inventory.carouselAriaLabel': { es: 'Carrusel de vehículos ESSENZA', en: 'ESSENZA vehicle carousel', de: 'ESSENZA Fahrzeug-Karussell', fr: 'Carrousel de véhicules ESSENZA', ru: 'Карусель автомобилей ESSENZA', it: 'Carosello veicoli ESSENZA' },
  'inventory.prevAria': { es: 'Vehículo anterior', en: 'Previous vehicle', de: 'Vorheriges Fahrzeug', fr: 'Véhicule précédent', ru: 'Предыдущий автомобиль', it: 'Veicolo precedente' },
  'inventory.nextAria': { es: 'Vehículo siguiente', en: 'Next vehicle', de: 'Nächstes Fahrzeug', fr: 'Véhicule suivant', ru: 'Следующий автомобиль', it: 'Veicolo successivo' },
  'inventory.verGaleria': { es: 'Ver galería', en: 'View gallery', de: 'Galerie ansehen', fr: 'Voir la galerie', ru: 'Смотреть галерею', it: 'Vedi galleria' },
  'inventory.reservarCita': { es: 'Reservar cita', en: 'Book appointment', de: 'Termin buchen', fr: 'Réserver un rendez-vous', ru: 'Записаться на просмотр', it: 'Prenota appuntamento' },
  'inventory.consultarPrecio': { es: 'Consultar precio', en: 'Price on request', de: 'Preis auf Anfrage', fr: 'Prix sur demande', ru: 'Цена по запросу', it: 'Prezzo su richiesta' },
  'inventory.consultarKm': { es: 'Consultar kilometraje', en: 'Mileage on request', de: 'Kilometerstand auf Anfrage', fr: 'Kilométrage sur demande', ru: 'Пробег по запросу', it: 'Chilometraggio su richiesta' },
  'inventory.exterior': { es: 'Exterior', en: 'Exterior', de: 'Außenfarbe', fr: 'Extérieur', ru: 'Экстерьер', it: 'Esterno' },
  'inventory.interior': { es: 'Interior', en: 'Interior', de: 'Innenraum', fr: 'Intérieur', ru: 'Салон', it: 'Interno' },
  'inventory.dotAria': { es: 'Ir a', en: 'Go to', de: 'Gehe zu', fr: 'Aller à', ru: 'Перейти к', it: 'Vai a' },

  'modal.close': { es: 'Cerrar', en: 'Close', de: 'Schließen', fr: 'Fermer', ru: 'Закрыть', it: 'Chiudi' },
  'modal.photoPrev': { es: 'Foto anterior', en: 'Previous photo', de: 'Vorheriges Foto', fr: 'Photo précédente', ru: 'Предыдущее фото', it: 'Foto precedente' },
  'modal.photoNext': { es: 'Foto siguiente', en: 'Next photo', de: 'Nächstes Foto', fr: 'Photo suivante', ru: 'Следующее фото', it: 'Foto successiva' },
  'modal.foto': { es: 'Foto', en: 'Photo', de: 'Foto', fr: 'Photo', ru: 'Фото', it: 'Foto' },
  'modal.km': { es: 'Km', en: 'Mileage', de: 'Laufleistung', fr: 'Kilométrage', ru: 'Пробег', it: 'Chilometraggio' },
  'modal.motor': { es: 'Motor', en: 'Engine', de: 'Motor', fr: 'Moteur', ru: 'Двигатель', it: 'Motore' },
  'modal.potencia': { es: 'Potencia', en: 'Power', de: 'Leistung', fr: 'Puissance', ru: 'Мощность', it: 'Potenza' },
  'modal.transmision': { es: 'Transmisión', en: 'Transmission', de: 'Getriebe', fr: 'Transmission', ru: 'Трансмиссия', it: 'Trasmissione' },
  'modal.traccion': { es: 'Tracción', en: 'Drivetrain', de: 'Antrieb', fr: 'Transmission intégrale', ru: 'Привод', it: 'Trazione' },
  'modal.rines': { es: 'Rines', en: 'Wheels', de: 'Felgen', fr: 'Jantes', ru: 'Диски', it: 'Cerchi' },
  'modal.audio': { es: 'Audio', en: 'Audio', de: 'Soundsystem', fr: 'Audio', ru: 'Аудиосистема', it: 'Audio' },
  'modal.colorExterior': { es: 'Color exterior', en: 'Exterior color', de: 'Außenfarbe', fr: 'Couleur extérieure', ru: 'Цвет кузова', it: 'Colore esterno' },
  'modal.interior': { es: 'Interior', en: 'Interior', de: 'Innenraum', fr: 'Intérieur', ru: 'Салон', it: 'Interno' },
  'modal.estatus': { es: 'Estatus', en: 'Status', de: 'Status', fr: 'Statut', ru: 'Статус', it: 'Stato' },
  'modal.reservarCita': { es: 'Reservar cita', en: 'Book appointment', de: 'Termin buchen', fr: 'Réserver un rendez-vous', ru: 'Записаться на просмотр', it: 'Prenota appuntamento' },
  'modal.financiamiento': { es: 'Financiamiento', en: 'Financing', de: 'Finanzierung', fr: 'Financement', ru: 'Финансирование', it: 'Finanziamento' },

  'services.eyebrow': { es: 'Cómo trabajamos', en: 'How we work', de: 'So arbeiten wir', fr: 'Comment nous travaillons', ru: 'Как мы работаем', it: 'Come lavoriamo' },
  'services.title': { es: 'Compra, venta y consignación', en: 'Buy, sell and consign', de: 'Kaufen, verkaufen, in Kommission geben', fr: 'Achat, vente et dépôt-vente', ru: 'Покупка, продажа и комиссия', it: 'Acquisto, vendita e conto vendita' },
  'services.compraTitle': { es: 'Compra', en: 'Buy', de: 'Kaufen', fr: 'Achat', ru: 'Покупка', it: 'Acquisto' },
  'services.compraQuote': { es: '“Encontramos el automóvil que representa tu siguiente etapa.”', en: '“We find the car that represents your next chapter.”', de: '„Wir finden das Auto für Ihren nächsten Lebensabschnitt.“', fr: '« Nous trouvons la voiture qui représente votre prochaine étape. »', ru: '«Мы находим автомобиль, который откроет ваш следующий этап».', it: '“Troviamo l’auto che rappresenta la tua prossima tappa.”' },
  'services.compraLink': { es: 'Explorar inventario →', en: 'Explore inventory →', de: 'Inventar entdecken →', fr: 'Explorer l’inventaire →', ru: 'Смотреть автопарк →', it: 'Esplora l’inventario →' },
  'services.ventaTitle': { es: 'Venta', en: 'Sell', de: 'Verkaufen', fr: 'Vente', ru: 'Продажа', it: 'Vendita' },
  'services.ventaQuote': { es: '“Evaluación profesional, exposición premium y compradores calificados.”', en: '“Professional appraisal, premium exposure and qualified buyers.”', de: '„Professionelle Bewertung, Premium-Präsentation und geprüfte Käufer.“', fr: '« Évaluation professionnelle, exposition premium et acheteurs qualifiés. »', ru: '«Профессиональная оценка, премиальная площадка и проверенные покупатели».', it: '“Valutazione professionale, esposizione premium e acquirenti qualificati.”' },
  'services.ventaLink': { es: 'Vender mi vehículo →', en: 'Sell my vehicle →', de: 'Mein Fahrzeug verkaufen →', fr: 'Vendre mon véhicule →', ru: 'Продать мой автомобиль →', it: 'Vendi il mio veicolo →' },
  'services.consignacionTitle': { es: 'Consignación', en: 'Consignment', de: 'Kommissionsverkauf', fr: 'Dépôt-vente', ru: 'Комиссия', it: 'Conto vendita' },
  'services.consignacionQuote': { es: '“Tu automóvil, presentado ante la audiencia correcta.”', en: '“Your car, presented to the right audience.”', de: '„Ihr Auto, präsentiert dem richtigen Publikum.“', fr: '« Votre voiture, présentée au bon public. »', ru: '«Ваш автомобиль — перед подходящей аудиторией».', it: '“La tua auto, presentata al pubblico giusto.”' },
  'services.consignacionLink': { es: 'Consignar mi auto →', en: 'Consign my car →', de: 'Mein Auto in Kommission geben →', fr: 'Mettre ma voiture en dépôt-vente →', ru: 'Сдать авто на комиссию →', it: 'Metti la mia auto in conto vendita →' },

  'sell.eyebrow': { es: 'Vende o consigna', en: 'Sell or consign', de: 'Verkaufen oder in Kommission geben', fr: 'Vendre ou déposer', ru: 'Продать или сдать на комиссию', it: 'Vendi o metti in conto vendita' },
  'sell.title': { es: 'Vende tu automóvil', en: 'Sell your car', de: 'Verkaufen Sie Ihr Auto', fr: 'Vendez votre voiture', ru: 'Продайте свой автомобиль', it: 'Vendi la tua auto' },
  'sell.lead': { es: 'Cuéntanos sobre tu vehículo. Un asesor ESSENZA revisará tu información y te contactará por WhatsApp.', en: 'Tell us about your vehicle. An ESSENZA advisor will review your information and reach out on WhatsApp.', de: 'Erzählen Sie uns von Ihrem Fahrzeug. Ein ESSENZA-Berater prüft Ihre Angaben und meldet sich per WhatsApp.', fr: 'Parlez-nous de votre véhicule. Un conseiller ESSENZA examinera vos informations et vous contactera sur WhatsApp.', ru: 'Расскажите нам о вашем автомобиле. Консультант ESSENZA изучит информацию и свяжется с вами в WhatsApp.', it: 'Raccontaci del tuo veicolo. Un consulente ESSENZA esaminerà le tue informazioni e ti contatterà su WhatsApp.' },
  'sell.marca': { es: 'Marca', en: 'Make', de: 'Marke', fr: 'Marque', ru: 'Марка', it: 'Marca' },
  'sell.modelo': { es: 'Modelo', en: 'Model', de: 'Modell', fr: 'Modèle', ru: 'Модель', it: 'Modello' },
  'sell.anio': { es: 'Año', en: 'Year', de: 'Baujahr', fr: 'Année', ru: 'Год', it: 'Anno' },
  'sell.kilometraje': { es: 'Kilometraje', en: 'Mileage', de: 'Kilometerstand', fr: 'Kilométrage', ru: 'Пробег', it: 'Chilometraggio' },
  'sell.version': { es: 'Versión', en: 'Trim', de: 'Ausstattung', fr: 'Version', ru: 'Версия', it: 'Versione' },
  'sell.precioEsperado': { es: 'Precio esperado', en: 'Expected price', de: 'Erwarteter Preis', fr: 'Prix souhaité', ru: 'Ожидаемая цена', it: 'Prezzo desiderato' },
  'sell.estadoGeneral': { es: 'Estado general', en: 'Overall condition', de: 'Allgemeiner Zustand', fr: 'État général', ru: 'Общее состояние', it: 'Condizioni generali' },
  'sell.selecciona': { es: 'Selecciona una opción', en: 'Select an option', de: 'Option auswählen', fr: 'Sélectionner une option', ru: 'Выберите вариант', it: 'Seleziona un’opzione' },
  'sell.excelente': { es: 'Excelente', en: 'Excellent', de: 'Ausgezeichnet', fr: 'Excellent', ru: 'Отличное', it: 'Eccellente' },
  'sell.muyBueno': { es: 'Muy bueno', en: 'Very good', de: 'Sehr gut', fr: 'Très bon', ru: 'Очень хорошее', it: 'Molto buono' },
  'sell.bueno': { es: 'Bueno', en: 'Good', de: 'Gut', fr: 'Bon', ru: 'Хорошее', it: 'Buono' },
  'sell.requiereAtencion': { es: 'Requiere atención', en: 'Needs attention', de: 'Benötigt Aufmerksamkeit', fr: 'Nécessite une attention', ru: 'Требует внимания', it: 'Richiede attenzione' },
  'sell.fotos': { es: 'Fotografías del vehículo', en: 'Vehicle photos', de: 'Fotos des Fahrzeugs', fr: 'Photos du véhicule', ru: 'Фотографии автомобиля', it: 'Foto del veicolo' },
  'sell.nombre': { es: 'Nombre', en: 'Name', de: 'Name', fr: 'Nom', ru: 'Имя', it: 'Nome' },
  'sell.telefono': { es: 'Teléfono', en: 'Phone', de: 'Telefon', fr: 'Téléphone', ru: 'Телефон', it: 'Telefono' },
  'sell.consentimiento': { es: 'Acepto que ESSENZA MOTORS mx contacte mi información de acuerdo con el aviso de privacidad.', en: 'I agree that ESSENZA MOTORS mx may use my information to contact me, per the privacy notice.', de: 'Ich stimme zu, dass ESSENZA MOTORS mx meine Angaben gemäß der Datenschutzerklärung zur Kontaktaufnahme nutzt.', fr: 'J’accepte qu’ESSENZA MOTORS mx utilise mes informations pour me contacter, conformément à l’avis de confidentialité.', ru: 'Я согласен(на), что ESSENZA MOTORS mx свяжется со мной с использованием моих данных согласно политике конфиденциальности.', it: 'Accetto che ESSENZA MOTORS mx utilizzi i miei dati per contattarmi, in conformità con l’informativa sulla privacy.' },
  'sell.submit': { es: 'Enviar al proceso de selección ESSENZA', en: 'Submit to the ESSENZA selection process', de: 'An den ESSENZA-Auswahlprozess senden', fr: 'Soumettre au processus de sélection ESSENZA', ru: 'Отправить на отбор ESSENZA', it: 'Invia al processo di selezione ESSENZA' },
  'sell.confirmQuote': { es: '“Tu vehículo ha entrado al proceso de selección ESSENZA.”', en: '“Your vehicle has entered the ESSENZA selection process.”', de: '„Ihr Fahrzeug befindet sich nun im ESSENZA-Auswahlprozess.“', fr: '« Votre véhicule est entré dans le processus de sélection ESSENZA. »', ru: '«Ваш автомобиль включён в процесс отбора ESSENZA».', it: '“Il tuo veicolo è entrato nel processo di selezione ESSENZA.”' },
  'sell.continueWhatsapp': { es: 'Continuar por WhatsApp →', en: 'Continue on WhatsApp →', de: 'Weiter auf WhatsApp →', fr: 'Continuer sur WhatsApp →', ru: 'Продолжить в WhatsApp →', it: 'Continua su WhatsApp →' },
  'sell.placeholderKm': { es: '18,000 km', en: '18,000 mi', de: '18.000 km', fr: '18 000 km', ru: '18 000 км', it: '18.000 km' },
  'sell.placeholderNombre': { es: 'Tu nombre', en: 'Your name', de: 'Ihr Name', fr: 'Votre nom', ru: 'Ваше имя', it: 'Il tuo nome' },

  'booking.eyebrow': { es: 'Agenda una experiencia', en: 'Book an experience', de: 'Termin vereinbaren', fr: 'Réserver une expérience', ru: 'Записаться на визит', it: 'Prenota un’esperienza' },
  'booking.title': { es: 'Reservación de cita', en: 'Appointment booking', de: 'Terminbuchung', fr: 'Réservation de rendez-vous', ru: 'Запись на встречу', it: 'Prenotazione appuntamento' },
  'booking.step1Title': { es: '1. Tipo de cita', en: '1. Appointment type', de: '1. Terminart', fr: '1. Type de rendez-vous', ru: '1. Тип визита', it: '1. Tipo di appuntamento' },
  'booking.optVisita': { es: 'Visita al showroom', en: 'Showroom visit', de: 'Showroom-Besuch', fr: 'Visite du showroom', ru: 'Визит в шоурум', it: 'Visita allo showroom' },
  'booking.optPrueba': { es: 'Prueba de manejo', en: 'Test drive', de: 'Probefahrt', fr: 'Essai routier', ru: 'Тест-драйв', it: 'Test drive' },
  'booking.optEvaluacion': { es: 'Evaluación para consignación', en: 'Consignment appraisal', de: 'Bewertung für Kommissionsverkauf', fr: 'Évaluation pour dépôt-vente', ru: 'Оценка для комиссии', it: 'Valutazione per conto vendita' },
  'booking.optVenta': { es: 'Venta de vehículo', en: 'Sell a vehicle', de: 'Fahrzeug verkaufen', fr: 'Vente d’un véhicule', ru: 'Продажа автомобиля', it: 'Vendita di un veicolo' },
  'booking.optAsesoria': { es: 'Asesoría de compra', en: 'Buying advice', de: 'Kaufberatung', fr: 'Conseil à l’achat', ru: 'Консультация по покупке', it: 'Consulenza all’acquisto' },
  'booking.step2Title': { es: '2. Vehículo de interés', en: '2. Vehicle of interest', de: '2. Interessiertes Fahrzeug', fr: '2. Véhicule d’intérêt', ru: '2. Интересующий автомобиль', it: '2. Veicolo di interesse' },
  'booking.generalOption': { es: 'General / aún no lo sé', en: 'General / not sure yet', de: 'Allgemein / noch unklar', fr: 'Général / pas encore décidé', ru: 'Не определился(лась)', it: 'Generale / non ancora deciso' },
  'booking.fechaHorario': { es: 'Fecha y horario', en: 'Date and time', de: 'Datum und Uhrzeit', fr: 'Date et heure', ru: 'Дата и время', it: 'Data e orario' },
  'booking.fecha': { es: 'Fecha', en: 'Date', de: 'Datum', fr: 'Date', ru: 'Дата', it: 'Data' },
  'booking.hora': { es: 'Hora', en: 'Time', de: 'Uhrzeit', fr: 'Heure', ru: 'Время', it: 'Ora' },
  'booking.step3Title': { es: '3. Tus datos', en: '3. Your details', de: '3. Ihre Daten', fr: '3. Vos coordonnées', ru: '3. Ваши данные', it: '3. I tuoi dati' },
  'booking.nombre': { es: 'Nombre', en: 'Name', de: 'Name', fr: 'Nom', ru: 'Имя', it: 'Nome' },
  'booking.telefono': { es: 'Teléfono', en: 'Phone', de: 'Telefon', fr: 'Téléphone', ru: 'Телефон', it: 'Telefono' },
  'booking.step4Title': { es: '4. Confirmación', en: '4. Confirmation', de: '4. Bestätigung', fr: '4. Confirmation', ru: '4. Подтверждение', it: '4. Conferma' },
  'booking.confirmarWhatsapp': { es: 'Confirmar por WhatsApp →', en: 'Confirm on WhatsApp →', de: 'Auf WhatsApp bestätigen →', fr: 'Confirmer sur WhatsApp →', ru: 'Подтвердить в WhatsApp →', it: 'Conferma su WhatsApp →' },
  'booking.atras': { es: 'Atrás', en: 'Back', de: 'Zurück', fr: 'Précédent', ru: 'Назад', it: 'Indietro' },
  'booking.continuar': { es: 'Continuar', en: 'Continue', de: 'Weiter', fr: 'Continuer', ru: 'Далее', it: 'Continua' },
  'booking.listo': { es: 'Listo', en: 'Done', de: 'Fertig', fr: 'Terminé', ru: 'Готово', it: 'Fatto' },
  'booking.placeholderNombre': { es: 'Tu nombre', en: 'Your name', de: 'Ihr Name', fr: 'Votre nom', ru: 'Ваше имя', it: 'Il tuo nome' },

  'history.eyebrow': { es: 'Nuestra historia', en: 'Our story', de: 'Unsere Geschichte', fr: 'Notre histoire', ru: 'Наша история', it: 'La nostra storia' },
  'history.title': { es: 'ESSENZA nació de una obsesión: encontrar automóviles que provoquen algo antes incluso de encenderlos.', en: 'ESSENZA was born from an obsession: finding cars that stir something before you even start the engine.', de: 'ESSENZA entstand aus einer Obsession: Autos zu finden, die etwas auslösen, noch bevor man den Motor startet.', fr: 'ESSENZA est née d’une obsession : trouver des voitures qui suscitent une émotion avant même de démarrer le moteur.', ru: 'ESSENZA родилась из одержимости — находить автомобили, которые вызывают эмоции ещё до запуска двигателя.', it: 'ESSENZA è nata da un’ossessione: trovare automobili capaci di emozionare ancora prima di accenderle.' },
  'history.item1Year': { es: 'Fundación', en: 'Founding', de: 'Gründung', fr: 'Fondation', ru: 'Основание', it: 'Fondazione' },
  'history.item1Text': { es: 'Nace ESSENZA MOTORS en León, Guanajuato, con la visión de curar —no solo vender— automóviles excepcionales.', en: 'ESSENZA MOTORS is founded in León, Guanajuato, with a vision to curate — not just sell — exceptional cars.', de: 'ESSENZA MOTORS wird in León, Guanajuato, gegründet — mit der Vision, außergewöhnliche Autos zu kuratieren, nicht nur zu verkaufen.', fr: 'ESSENZA MOTORS voit le jour à León, Guanajuato, avec la vision de sélectionner — pas seulement de vendre — des automobiles exceptionnelles.', ru: 'ESSENZA MOTORS основана в Леоне, Гуанахуато, с идеей не просто продавать, а тщательно отбирать выдающиеся автомобили.', it: 'Nasce ESSENZA MOTORS a León, Guanajuato, con la visione di curare — non solo vendere — automobili eccezionali.' },
  'history.item2Year': { es: 'Primer vehículo premium', en: 'First premium vehicle', de: 'Erstes Premium-Fahrzeug', fr: 'Premier véhicule premium', ru: 'Первый премиальный автомобиль', it: 'Primo veicolo premium' },
  'history.item2Text': { es: 'La primera unidad de alto desempeño entra al showroom y define el estándar de selección de la marca.', en: 'The first high-performance unit enters the showroom, setting the brand’s standard for selection.', de: 'Das erste Hochleistungsfahrzeug zieht in den Showroom ein und setzt den Auswahlstandard der Marke.', fr: 'La première unité haute performance entre dans le showroom et fixe la norme de sélection de la marque.', ru: 'Первый высокопроизводительный автомобиль поступает в шоурум, задавая стандарт отбора бренда.', it: 'La prima unità ad alte prestazioni entra nello showroom e definisce lo standard di selezione del marchio.' },
  'history.item3Year': { es: 'Apertura del showroom', en: 'Showroom opening', de: 'Eröffnung des Showrooms', fr: 'Ouverture du showroom', ru: 'Открытие шоурума', it: 'Apertura dello showroom' },
  'history.item3Text': { es: 'ESSENZA abre sus puertas en Lomas del Campestre como punto de encuentro para coleccionistas y entusiastas.', en: 'ESSENZA opens its doors in Lomas del Campestre as a gathering place for collectors and enthusiasts.', de: 'ESSENZA öffnet seine Türen in Lomas del Campestre als Treffpunkt für Sammler und Enthusiasten.', fr: 'ESSENZA ouvre ses portes à Lomas del Campestre, lieu de rencontre pour collectionneurs et passionnés.', ru: 'ESSENZA открывает двери в Ломас-дель-Кампестре как место встречи коллекционеров и энтузиастов.', it: 'ESSENZA apre le porte a Lomas del Campestre come punto d’incontro per collezionisti e appassionati.' },
  'history.item4Year': { es: 'Crecimiento del inventario', en: 'Inventory growth', de: 'Wachstum des Bestands', fr: 'Croissance de l’inventaire', ru: 'Расширение автопарка', it: 'Crescita dell’inventario' },
  'history.item4Text': { es: 'El catálogo se expande con marcas como Porsche, Ferrari, Lamborghini, Audi y BMW.', en: 'The catalog expands with brands like Porsche, Ferrari, Lamborghini, Audi and BMW.', de: 'Der Katalog wächst um Marken wie Porsche, Ferrari, Lamborghini, Audi und BMW.', fr: 'Le catalogue s’enrichit de marques comme Porsche, Ferrari, Lamborghini, Audi et BMW.', ru: 'Каталог пополняется такими марками, как Porsche, Ferrari, Lamborghini, Audi и BMW.', it: 'Il catalogo si espande con marchi come Porsche, Ferrari, Lamborghini, Audi e BMW.' },
  'history.item5Year': { es: 'Vehículos exóticos', en: 'Exotic vehicles', de: 'Exotische Fahrzeuge', fr: 'Véhicules exotiques', ru: 'Эксклюзивные автомобили', it: 'Veicoli esotici' },
  'history.item5Text': { es: 'ESSENZA incorpora unidades exóticas y de edición limitada a su selección permanente.', en: 'ESSENZA adds exotic and limited-edition units to its permanent selection.', de: 'ESSENZA nimmt exotische Fahrzeuge und Sondermodelle in seine dauerhafte Auswahl auf.', fr: 'ESSENZA intègre des unités exotiques et en édition limitée à sa sélection permanente.', ru: 'ESSENZA включает эксклюзивные и лимитированные модели в постоянную коллекцию.', it: 'ESSENZA aggiunge unità esotiche e in edizione limitata alla propria selezione permanente.' },
  'history.note': { es: 'Cronología editable — pendiente de fechas e hitos reales proporcionados por ESSENZA MOTORS.', en: 'Editable timeline — pending real dates and milestones from ESSENZA MOTORS.', de: 'Bearbeitbare Zeitleiste — echte Daten und Meilensteine von ESSENZA MOTORS ausstehend.', fr: 'Chronologie modifiable — en attente des dates et jalons réels fournis par ESSENZA MOTORS.', ru: 'Хронология в разработке — ожидаются реальные даты и вехи от ESSENZA MOTORS.', it: 'Cronologia modificabile — in attesa di date e tappe reali fornite da ESSENZA MOTORS.' },

  'trust.eyebrow': { es: 'Confianza y opiniones', en: 'Trust and reviews', de: 'Vertrauen und Bewertungen', fr: 'Confiance et avis', ru: 'Доверие и отзывы', it: 'Fiducia e recensioni' },
  'trust.title': { es: 'Reputación construida en cada entrega.', en: 'A reputation built with every delivery.', de: 'Ein Ruf, aufgebaut mit jeder Übergabe.', fr: 'Une réputation bâtie à chaque livraison.', ru: 'Репутация, выстроенная с каждой сделкой.', it: 'Una reputazione costruita a ogni consegna.' },
  'trust.basedOn': { es: 'Basado en 100 opiniones en Google', en: 'Based on 100 Google reviews', de: 'Basierend auf 100 Google-Rezensionen', fr: 'Basé sur 100 avis Google', ru: 'На основе 100 отзывов в Google', it: 'Basato su 100 recensioni Google' },
  'trust.card1Title': { es: 'Revisión de unidades', en: 'Vehicle inspection', de: 'Fahrzeugprüfung', fr: 'Inspection des véhicules', ru: 'Проверка автомобилей', it: 'Ispezione dei veicoli' },
  'trust.card1Text': { es: 'Cada vehículo pasa por un proceso de inspección antes de integrarse al inventario.', en: 'Every vehicle goes through an inspection process before joining the inventory.', de: 'Jedes Fahrzeug durchläuft eine Prüfung, bevor es ins Inventar aufgenommen wird.', fr: 'Chaque véhicule passe par un processus d’inspection avant d’intégrer l’inventaire.', ru: 'Каждый автомобиль проходит проверку перед включением в автопарк.', it: 'Ogni veicolo passa attraverso un processo di ispezione prima di entrare nell’inventario.' },
  'trust.card2Title': { es: 'Documentación', en: 'Documentation', de: 'Dokumentation', fr: 'Documentation', ru: 'Документация', it: 'Documentazione' },
  'trust.card2Text': { es: 'Acompañamiento en la verificación documental de cada unidad.', en: 'Support through the document verification of every unit.', de: 'Begleitung bei der Dokumentenprüfung jedes Fahrzeugs.', fr: 'Accompagnement dans la vérification documentaire de chaque véhicule.', ru: 'Сопровождение при проверке документов каждого автомобиля.', it: 'Assistenza nella verifica documentale di ogni unità.' },
  'trust.card3Title': { es: 'Transparencia', en: 'Transparency', de: 'Transparenz', fr: 'Transparence', ru: 'Прозрачность', it: 'Trasparenza' },
  'trust.card3Text': { es: 'Información clara sobre el estado y la historia de cada automóvil.', en: 'Clear information about the condition and history of every car.', de: 'Klare Informationen zu Zustand und Historie jedes Fahrzeugs.', fr: 'Informations claires sur l’état et l’historique de chaque voiture.', ru: 'Чёткая информация о состоянии и истории каждого автомобиля.', it: 'Informazioni chiare sullo stato e sulla storia di ogni automobile.' },
  'trust.card4Title': { es: 'Acompañamiento', en: 'Guidance', de: 'Begleitung', fr: 'Accompagnement', ru: 'Сопровождение', it: 'Assistenza' },
  'trust.card4Text': { es: 'Asesoría personalizada durante todo el proceso de compra, venta o consignación.', en: 'Personalized guidance through the entire buying, selling or consignment process.', de: 'Persönliche Beratung während des gesamten Kauf-, Verkaufs- oder Kommissionsprozesses.', fr: 'Conseil personnalisé tout au long du processus d’achat, de vente ou de dépôt-vente.', ru: 'Персональное сопровождение на всех этапах покупки, продажи или комиссии.', it: 'Consulenza personalizzata durante tutto il processo di acquisto, vendita o conto vendita.' },

  'location.eyebrow': { es: 'Visítanos', en: 'Visit us', de: 'Besuchen Sie uns', fr: 'Venez nous voir', ru: 'Приезжайте к нам', it: 'Vienici a trovare' },
  'location.comoLlegar': { es: 'Cómo llegar', en: 'Get directions', de: 'Route anzeigen', fr: 'Itinéraire', ru: 'Как добраться', it: 'Come raggiungerci' },
  'location.llamar': { es: 'Llamar · 477 449 2547', en: 'Call · 477 449 2547', de: 'Anrufen · 477 449 2547', fr: 'Appeler · 477 449 2547', ru: 'Позвонить · 477 449 2547', it: 'Chiama · 477 449 2547' },

  'footer.cta': { es: 'Tu próxima máquina extraordinaria comienza aquí.', en: 'Your next extraordinary machine starts here.', de: 'Ihre nächste außergewöhnliche Maschine beginnt hier.', fr: 'Votre prochaine machine extraordinaire commence ici.', ru: 'Ваша следующая выдающаяся машина начинается здесь.', it: 'La tua prossima macchina straordinaria inizia qui.' },
  'footer.contacto': { es: 'Contacto', en: 'Contact', de: 'Kontakt', fr: 'Contact', ru: 'Контакты', it: 'Contatto' },
  'footer.siguenos': { es: 'Síguenos', en: 'Follow us', de: 'Folgen Sie uns', fr: 'Suivez-nous', ru: 'Подписывайтесь', it: 'Seguici' },
  'footer.legal': { es: 'Legal', en: 'Legal', de: 'Rechtliches', fr: 'Mentions légales', ru: 'Правовая информация', it: 'Legale' },
  'footer.avisoPrivacidad': { es: 'Aviso de privacidad', en: 'Privacy notice', de: 'Datenschutzerklärung', fr: 'Politique de confidentialité', ru: 'Политика конфиденциальности', it: 'Informativa sulla privacy' },
  'footer.terminos': { es: 'Términos y condiciones', en: 'Terms and conditions', de: 'Allgemeine Geschäftsbedingungen', fr: 'Conditions générales', ru: 'Условия использования', it: 'Termini e condizioni' },
  'footer.copyright': { es: 'Todos los derechos reservados.', en: 'All rights reserved.', de: 'Alle Rechte vorbehalten.', fr: 'Tous droits réservés.', ru: 'Все права защищены.', it: 'Tutti i diritti riservati.' },
};

// Vehicle-data values (finite set, matched by exact Spanish source string).
const ESSENZA_VAL = {
  'Disponible': { en: 'Available', de: 'Verfügbar', fr: 'Disponible', ru: 'В наличии', it: 'Disponibile' },
  'Apartado': { en: 'On hold', de: 'Reserviert', fr: 'Réservé', ru: 'Забронирован', it: 'Riservato' },
  'Próximo ingreso': { en: 'Arriving soon', de: 'Demnächst verfügbar', fr: 'Arrivée prochaine', ru: 'Скоро в продаже', it: 'Prossimo arrivo' },
  'Deportivo': { en: 'Sports car', de: 'Sportwagen', fr: 'Sportive', ru: 'Спортивный', it: 'Sportiva' },
  'Gran Turismo': { en: 'Grand Tourer', de: 'Gran Turismo', fr: 'Grand Tourisme', ru: 'Гран-туризмо', it: 'Gran Turismo' },
  'SUV performance': { en: 'Performance SUV', de: 'Performance-SUV', fr: 'SUV performance', ru: 'Performance SUV', it: 'SUV sportivo' },
  'Trasera': { en: 'Rear-wheel drive', de: 'Hinterradantrieb', fr: 'Propulsion arrière', ru: 'Задний привод', it: 'Trazione posteriore' },
  'Negro': { en: 'Black', de: 'Schwarz', fr: 'Noir', ru: 'Чёрный', it: 'Nero' },
  'Rojo': { en: 'Red', de: 'Rot', fr: 'Rouge', ru: 'Красный', it: 'Rosso' },
  'Gris': { en: 'Gray', de: 'Grau', fr: 'Gris', ru: 'Серый', it: 'Grigio' },
  'Naranja': { en: 'Orange', de: 'Orange', fr: 'Orange', ru: 'Оранжевый', it: 'Arancione' },
  'Blanco': { en: 'White', de: 'Weiß', fr: 'Blanc', ru: 'Белый', it: 'Bianco' },
  'Negro (piel con costuras naranjas)': { en: 'Black (leather, orange stitching)', de: 'Schwarz (Leder, orangefarbene Nähte)', fr: 'Noir (cuir, surpiqûres orange)', ru: 'Чёрный (кожа, оранжевая прострочка)', it: 'Nero (pelle, cuciture arancioni)' },
  'Negro (piel/gamuza)': { en: 'Black (leather/suede)', de: 'Schwarz (Leder/Wildleder)', fr: 'Noir (cuir/daim)', ru: 'Чёрный (кожа/замша)', it: 'Nero (pelle/scamosciato)' },
  'Negro (piel, Alcantara)': { en: 'Black (leather, Alcantara)', de: 'Schwarz (Leder, Alcantara)', fr: 'Noir (cuir, Alcantara)', ru: 'Чёрный (кожа, алькантара)', it: 'Nero (pelle, Alcantara)' },
  'Azul (piel)': { en: 'Blue (leather)', de: 'Blau (Leder)', fr: 'Bleu (cuir)', ru: 'Синий (кожа)', it: 'Blu (pelle)' },
  'Negro (piel)': { en: 'Black (leather)', de: 'Schwarz (Leder)', fr: 'Noir (cuir)', ru: 'Чёрный (кожа)', it: 'Nero (pelle)' },
  'Automática': { en: 'Automatic', de: 'Automatik', fr: 'Automatique', ru: 'Автоматическая', it: 'Automatico' },
  'Automática 8 vel.': { en: '8-speed automatic', de: '8-Gang-Automatik', fr: 'Automatique 8 vitesses', ru: '8-ступенчатая АКПП', it: 'Automatico a 8 rapporti' },
  'e-gear automatizada (modos Sport/Corsa)': { en: 'e-gear automated (Sport/Corsa modes)', de: 'e-gear automatisiert (Sport/Corsa-Modi)', fr: 'e-gear automatisée (modes Sport/Corsa)', ru: 'автоматизированная e-gear (режимы Sport/Corsa)', it: 'e-gear automatizzato (modalità Sport/Corsa)' },
  '5.2L V10 (dato de fábrica del modelo, versión por confirmar)': { en: '5.2L V10 (factory spec for the model, exact trim to be confirmed)', de: '5,2 l V10 (Werksangabe des Modells, genaue Version wird noch bestätigt)', fr: '5,2 L V10 (donnée d’usine du modèle, version exacte à confirmer)', ru: '5,2 л V10 (заводские данные модели, точная версия уточняется)', it: '5,2L V10 (dato di fabbrica del modello, versione esatta da confermare)' },
  '~560 hp (dato de fábrica del modelo)': { en: '~560 hp (factory spec for the model)', de: '~560 PS (Werksangabe des Modells)', fr: '~560 ch (donnée d’usine du modèle)', ru: '~560 л.с. (заводские данные модели)', it: '~560 CV (dato di fabbrica del modello)' },
  'Rin 23"': { en: '23" wheels', de: '23"-Felgen', fr: 'Jantes 23"', ru: 'Диски 23"', it: 'Cerchi 23"' },
  'Rin 20"': { en: '20" wheels', de: '20"-Felgen', fr: 'Jantes 20"', ru: 'Диски 20"', it: 'Cerchi 20"' },
};

(() => {
  const STORAGE_KEY = 'essenzaLang';

  const getLang = () => localStorage.getItem(STORAGE_KEY) || 'es';

  // Translate a known vehicle-data value; unmatched values fall back as-is.
  const tv = (value) => {
    if (value == null) return value;
    const entry = ESSENZA_VAL[value];
    if (!entry) return value;
    return entry[getLang()] || value;
  };

  // A "val." prefix routes a data-i18n key through the vehicle-data value
  // dictionary instead of the UI dictionary (used for <option> labels that
  // mirror a value also used dynamically, like "Disponible").
  const t = (key) => {
    if (key.startsWith('val.')) return tv(key.slice(4));
    const entry = ESSENZA_UI[key];
    if (!entry) return key;
    return entry[getLang()] || entry.es || key;
  };

  const applyStaticTranslations = () => {
    document.documentElement.lang = getLang() === 'es' ? 'es-MX' : getLang();

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      el.innerHTML = t(el.dataset.i18nHtml);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      el.setAttribute('aria-label', t(el.dataset.i18nAria));
    });
  };

  const setLang = (lang) => {
    localStorage.setItem(STORAGE_KEY, lang);
    applyStaticTranslations();
    document.dispatchEvent(new CustomEvent('essenza:langchange', { detail: { lang } }));
  };

  const buildLangSwitch = () => {
    const mount = document.getElementById('langSwitch');
    if (!mount) return;

    const current = getLang();
    mount.innerHTML = `
      <button type="button" class="lang-switch__toggle" aria-haspopup="listbox" aria-expanded="false">
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" class="lang-switch__icon">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.3"></circle>
          <ellipse cx="12" cy="12" rx="4" ry="9" fill="none" stroke="currentColor" stroke-width="1.3"></ellipse>
          <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="1.3"></line>
          <path d="M5 7.5c1.9 1 4.4 1.5 7 1.5s5.1-.5 7-1.5M5 16.5c1.9-1 4.4-1.5 7-1.5s5.1.5 7 1.5" fill="none" stroke="currentColor" stroke-width="1.3"></path>
        </svg>
        <span class="lang-switch__code">${current.toUpperCase()}</span>
      </button>
      <ul class="lang-switch__menu" role="listbox" hidden>
        ${ESSENZA_LANGS.map(
          (l) => `<li>
            <button type="button" class="lang-switch__option${l.code === current ? ' is-active' : ''}" role="option" aria-selected="${l.code === current}" data-lang="${l.code}">${l.name}</button>
          </li>`
        ).join('')}
      </ul>
    `;

    const toggle = mount.querySelector('.lang-switch__toggle');
    const menu = mount.querySelector('.lang-switch__menu');
    const codeEl = mount.querySelector('.lang-switch__code');

    const close = () => {
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    };
    const open = () => {
      menu.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
    };

    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      if (menu.hidden) open();
      else close();
    });

    menu.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-lang]');
      if (!btn) return;
      const lang = btn.dataset.lang;
      codeEl.textContent = lang.toUpperCase();
      mount.querySelectorAll('.lang-switch__option').forEach((opt) => {
        opt.classList.toggle('is-active', opt.dataset.lang === lang);
        opt.setAttribute('aria-selected', String(opt.dataset.lang === lang));
      });
      close();
      setLang(lang);
    });

    document.addEventListener('click', (event) => {
      if (!mount.contains(event.target)) close();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close();
    });
  };

  // Always the Spanish label for a UI key, regardless of active language —
  // used where the display text is translated but a downstream value (like
  // the WhatsApp message ESSENZA staff reads) must stay in Spanish.
  const tEs = (key) => (ESSENZA_UI[key] ? ESSENZA_UI[key].es : key);

  window.essenzaI18n = { t, tv, tEs, getLang, setLang, applyStaticTranslations };

  document.addEventListener('DOMContentLoaded', () => {
    buildLangSwitch();
    applyStaticTranslations();
  });
})();
