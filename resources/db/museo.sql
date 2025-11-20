-- Tabla de artistas principales
CREATE TABLE principalMakers (
    IdPrincipalMaker SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    placeOfBirth VARCHAR(255),
    dateOfBirth VARCHAR(20),
    dateOfDeath VARCHAR(20),
    placeOfDeath VARCHAR(255),    
    nationality VARCHAR(255),
    deletedAt TIMESTAMP NULL DEFAULT NULL
);

INSERT INTO principalMakers (name, placeOfBirth, dateOfBirth, dateOfDeath, placeOfDeath, nationality) VALUES 
    ('Rembrandt van Rijn', 'Leiden', '1606-07-15', '1669-10-08', 'Ámsterdam', 'Holandés del Norte'),
    ('Vincent van Gogh', 'Groot Zundert', '1853-03-30', '1890-07-29', 'Auvers-sur-Oise', 'Holandés'),
    ('Cornelis Cornelisz. van Haarlem', 'Haarlem', '1562', '1638-11-11', 'Haarlem', 'Holandés del Norte'),
    ('Pieter de Hooch', 'Rotterdam', '1629-12-20', '1679', 'Ámsterdam', ''),
    ('Frans Hals', 'Antwerpen (stad)', '1583', '1666-08-26', 'Haarlem', ''),
    ('Gabriël Metsu', 'Leiden', '1629-01', '1667-10-24', '', ''),
    ('Jan Havicksz. Steen', 'Leiden', '1626', '1679-02', 'Leiden', 'Holandés del Norte'),
    ('Jan Davidsz. de Heem', 'Utrecht (stad)', '1606-04', '1684-04-26', 'Antwerpen (stad)', ''),
    ('Gerard de Lairesse', 'Luik (stad)', '1641', '1711', 'Ámsterdam', 'Holandés del Norte'),
    ('Jozef Israëls', 'Groningen', '1824-01-27', '1911-08-12', 'Den Haag', 'Holandés');

-- Tabla de ocupaciones del artista
CREATE TABLE occupations (
    IdOccupation SERIAL PRIMARY KEY,    
    name VARCHAR(255)
);

INSERT INTO occupations (name)  VALUES
    ('grabador'),
    ('dibujante'),
    ('pintor');

--Tabla intermedia entre principalMakers y occupations
CREATE TABLE makersOccupations (
    IdMakerOccupation SERIAL PRIMARY KEY,
    IdPrincipalMaker INTEGER REFERENCES principalMakers(IdPrincipalMaker),
    IdOccupation INTEGER REFERENCES occupations(IdOccupation),
    deletedAt TIMESTAMP NULL DEFAULT NULL,
    UNIQUE (IdPrincipalMaker, IdOccupation)
);

INSERT INTO makersOccupations (IdPrincipalMaker,IdOccupation) VALUES
    (1, 1), (1, 2), (1, 3),
    (2, 1), (2, 2), (2, 3),
    (3, 3), (3, 2),
    (4, 2), (4, 3),
    (5, 2),
    (6, 2), (6, 3),
    (7, 1), (7, 3),
    (8, 3),
    (9, 1), (9, 2), (9, 3),
    (10, 1), (10, 2), (10, 3);

-- Tabla de tipo de obras "cuadro, pintura, escultura"
CREATE TABLE objectTypes (
    IdObjectType SERIAL PRIMARY KEY,
    typeName VARCHAR(255)
);


INSERT INTO objectTypes (typeName)  VALUES 
    ('pintura'),
    ('impresión fotomecánica'),
    ('dibujo'),
    ('impresión'),
    ('tarjeta de visita');

-- Crear tabla principal de obras artisticas
CREATE TABLE artObjects (
    IdArtObject SERIAL PRIMARY KEY,
    objectNumber VARCHAR(255) NOT NULL UNIQUE,
    title TEXT,
    longTitle TEXT,
    IdPrincipalMaker INTEGER REFERENCES principalMakers (IdPrincipalMaker),
    hasImage BOOLEAN,
    productionPlaces TEXT[],
    description TEXT, 
    plaqueDescription TEXT,
    materials TEXT[],
    techniques TEXT[],
    physicalMedium TEXT,
    scLabelLine TEXT,
    historicalDescription TEXT
);

INSERT INTO artObjects (objectNumber, title, longTitle, IdPrincipalMaker, hasImage, productionPlaces, description, plaqueDescription, materials, techniques, physicalMedium, scLabelLine, historicalDescription)
VALUES ('SK-C-597', 'Retrato de una Mujer, Probablemente Maria Trip (1619-1683)', 'Retrato de una Mujer, Probablemente Maria Trip (1619-1683), Rembrandt van Rijn, 1639', 1, TRUE, ARRAY[]::text[], 'Retrato de Maria Trip (1619-83), hermana de Jacobus Trip y más tarde la esposa de Balthasar Coymans. De pie, de medio cuerpo, hacia la izquierda. El brazo izquierdo descansa sobre una barandilla de escalera, en la mano un abanico.', 'Maria Trip, hija de uno de los mercaderes más ricos de Ámsterdam, tenía veinte años cuando Rembrandt pintó su retrato. El artista colocó a Maria contra un arco de piedra y dedicó una atención particular a la luz reflejada, el vestido de moda y las joyas. Las costosas prendas están adornadas con tiras de encaje de oro y Maria lleva una profusión de perlas.', ARRAY['panel','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre panel', 'Rembrandt van Rijn (1606-1669), óleo sobre panel, 1639', 'La retratada es probablemente Maria Trip, de 20 años. Provenía de una familia extremadamente rica involucrada en el comercio de armas. Aquí, ella muestra su riqueza con todo el boato: lleva un cuello de encaje finísimo, un broche con pendientes a juego y una fortuna en perlas. El abanico plegable chino en su mano izquierda era todavía un accesorio muy raro y, por lo tanto, precioso en 1639.'),
       ('SK-C-216', 'Isaac y Rebeca, Conocidos como "La Novia Judía"', 'Isaac y Rebeca, Conocidos como "La Novia Judía" , Rembrandt van Rijn, c. 1665 - c. 1669', 1, TRUE, ARRAY[]::text[], 'Retrato de una pareja como Isaac y Rebeca u otras figuras del Antiguo Testamento, conocida bajo el título "La novia judía". El hombre apoya su mano derecha en el pecho de la mujer, el brazo izquierdo sobre los hombros. La mujer apoya su mano izquierda sobre la mano del hombre, la mano derecha sobre el vientre. La pareja está retratada de pie, hasta las rodillas, frente a una pared.', 'Parece que Rembrandt pintó a sus sujetos como la pareja bíblica, Isaac y Rebeca. Su nombre popular, la Novia Judía, es una invención posterior. El retrato está pintado con una mano extraordinariamente libre, como en la manga, donde la pintura es especialmente espesa y moldeada para reflejar la luz.', ARRAY['lino (material)','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'óleo sobre lienzo, c. 1665-1669', 'Para evitar ser asesinado y que su esposa fuera capturada por el rey Abimelec, Isaac ocultó su amor por Rebeca pretendiendo que eran hermanos. Sin embargo, su intimidad los traicionó cuando pensaron que no estaban siendo espiados. Rembrandt los representa en un momento tierno. Además, trabaja con una libertad excepcional, aplica la pintura en capas gruesas y la rasca con el mango de su pincel.'),
       ('SK-C-5', 'La ronda de noche Compañía de Milicia del Distrito II bajo el mando del Capitán Frans Banninck Cocq', 'La ronda de noche Compañía de Milicia del Distrito II bajo el mando del Capitán Frans Banninck Cocq, Rembrandt van Rijn, 1642', 1, TRUE, ARRAY['Ámsterdam'], 'Oficiales y otros fusileros del distrito II en Ámsterdam bajo el mando del capitán Frans Banninck Cocq y el teniente Willem van Ruytenburch, conocidos desde finales del siglo XVIII como "La Ronda de Noch". Fusileros de los Kloveniersdoelen saliendo por una puerta. En un escudo colocado junto a la puerta están los nombres de las personas retratadas: Frans Banning Cocq, señor de Purmerland e Ilpendam, Capitán Willem van Ruijtenburch van Vlaerdingen, señor de Vlaerdingen, Teniente, Jan Visscher Cornelisen Vaandrig, Rombout Kemp Sargento, Reijnier Engelen Sargento, Barent Harmansen, Jan Adriaensen Keyser, Elbert Willemsen, Jan Clasen Leydeckers, Jan Ockersen, Jan Pietersen Bronchorst, Harman Iacobsen Wormskerck, Jacob Dircksen de Roy, Jan van der Heede, Walich Schellingwou, Jan Brugman, Claes van Cruysbergen, Paulus Schoonhoven. Los fusileros están armados con picas, mosquetes y alabardas, entre otras cosas. A la derecha el tamborilero con un gran tambor. Entre los soldados de la izquierda hay una niña con un pollo muerto en la cintura, a la derecha un perro ladrando. Arriba a la izquierda el alférez con el estandarte extendido.', 'El lienzo más grande y famoso de Rembrandt fue hecho para el salón del gremio de los arcabuceros. Este era uno de varios salones de la guardia cívica de Ámsterdam, la milicia y policía de la ciudad. Rembrandt fue el primero en pintar figuras en un retrato de grupo haciendo algo. El capitán, vestido de negro, le está diciendo a su teniente que inicie la marcha de la compañía. Los guardias se están formando. Rembrandt usó la luz para enfocarse en detalles particulares, como la mano gesticulante del capitán y la joven en primer plano. Ella era la mascota de la compañía.', ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Rembrandt van Rijn (1606-1669), óleo sobre lienzo, 1642', 'El lienzo más grande y famoso de Rembrandt fue hecho para el salón del gremio de los arcabuceros. Esta era una de varias salas de la guardia cívica de Ámsterdam, la milicia y la policía de la ciudad. Rembrandt fue el primero en pintar figuras en un retrato de grupo haciendo algo. El capitán, vestido de negro, le está diciendo a su teniente que inicie la marcha de la compañía. Los guardias se están formando. Rembrandt usó la luz para enfocarse en detalles particulares, como la mano gesticulante del capitán y la joven en el fondo. Ella era la mascota de la compañía.'),
       ('SK-A-4050', 'Autorretrato como el Apóstol Pablo', 'Autorretrato como el Apóstol Pablo, Rembrandt van Rijn, 1661', 1, TRUE, ARRAY[]::text[], 'Autorretrato de Rembrandt como el apóstol Pablo. De medio cuerpo a la izquierda, el rostro vuelto hacia el espectador. Con un manto abierto que deja ver la espada que lleva en el pecho, en la cabeza un turbante blanco. En las manos un haz de epístolas desplegadas.', 'Aquí, Rembrandt tiene unos 55 años. En este retrato se representa a San Pablo, el apóstol, identificado por sus atributos habituales: un manuscrito y una espada, de la cual la empuñadura sobresale de debajo de la capa. El autorretrato es típico del estilo tardío de pintura de Rembrandt: usó la estructura de la pintura en la composición, como en los pliegues del turbante, por ejemplo.', ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'óleo sobre lienzo, 1661', 'Rembrandt tiene 55 años en este autorretrato, y aún se mira a sí mismo con franqueza. Aquí asume la apariencia de un personaje de la Biblia, el apóstol Pablo. La espada que sobresale de su capa y el manuscrito en sus manos son los atributos habituales del apóstol. Al usar su propio rostro, Rembrandt animó al espectador a interactuar personalmente con el santo.'),
       ('SK-C-6', 'Los Funcionarios de Muestreo del Gremio de Pañeros de Ámsterdam, Conocidos como "Los Síndico"', 'Los Funcionarios de Muestreo del Gremio de Pañeros de Ámsterdam, Conocidos como "Los Síndico", Rembrandt van Rijn, 1662', 1, TRUE, ARRAY[]::text[], 'Los Maestros del Paño: el colegio de maestros del paño (waardijns) del gremio de pañeros de Ámsterdam, reunidos alrededor de una mesa cubierta con una alfombra persa, sobre la mesa el libro de muestras abierto. Representados son (de izquierda a derecha): Jacob van Loon (1595-1674), Volckert Jansz (1605/10-81), Willem van Doeyenburg (ca. 1616-87), el sirviente Frans Hendricksz Bel (1629-1701), Aernout van der Mye (ca. 1625-81) y Jochem de Neve (1629-81). A la derecha encima de la chimenea un cuadro con una baliza encendida.', 'Los muestreadores verificaban la calidad de la tela teñida. Aquí Rembrandt los muestra en el trabajo, distraídos por un momento y mirando hacia arriba. Un síndico está a punto de sentarse o ponerse de pie, por lo que no todas las cabezas están al mismo nivel. Un truco inteligente que, con la pincelada segura y el uso sutil de la luz, lo convierten en uno de los retratos de grupo más animados del siglo XVII. Originalmente pintado para el salón de muestreo (Staalhof), en 1771 fue adquirido por el ayuntamiento de Ámsterdam.', ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'óleo sobre lienzo, 1662', 'Después de sufrir dificultades financieras en la década de 1650, Rembrandt se mudó a una casa de alquiler en Rozengracht. La élite de Ámsterdam ya no llamaba a su puerta tan a menudo como antes. Sin embargo, siguió siendo popular: este importante gremio le encargó pintar un retrato de grupo. Rembrandt produjo una escena animada haciendo que los guardianes levantaran la vista de su trabajo como si fueran interrumpidos por nuestra llegada.'),
       ('SK-A-3262', 'Autorretrato', 'Autorretrato, Vincent van Gogh, 1887', 2, TRUE, ARRAY[]::text[], 'Autorretrato de Vincent van Gogh. Busto con chaqueta marrón y sombrero gris.', 'Después de escuchar a su hermano Theo describir el nuevo estilo colorido del arte francés, Vincent decidió en 1886 mudarse a París. Pronto comenzó a experimentar con el nuevo idioma en una serie de autorretratos. Esto fue principalmente para evitar el gasto de usar modelos. Aquí se pintó a sí mismo como un parisino apuesto, con pinceladas sueltas y regulares en colores llamativos.', ARRAY['cartón','pintura al óleo (pintura)'], ARRAY[]::text[], 'cartón', 'Vincent van Gogh (1853-1890), óleo sobre cartón, 1887', 'Vincent se mudó a París en 1886, después de enterarse por su hermano Theo del nuevo y colorido estilo de pintura francesa. Sin perder tiempo, lo probó en varios autorretratos. Hizo esto principalmente para evitar tener que pagar por un modelo. Utilizando pinceladas rítmicas en colores llamativos, se retrató aquí como un parisino vestido a la moda.'),
       ('SK-A-3307', 'Aldea Agrícola al Atardecer', 'Aldea Agrícola al Atardecer, Vincent van Gogh, 1884', 2, TRUE, ARRAY[]::text[], 'Vista de un pueblo al atardecer. Al borde de un prado, entre árboles, hay varias casas bajas con techos de paja. En el centro hay dos figuras frente a un pajar.', NULL, ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Vincent van Gogh, 1884, óleo sobre lienzo', NULL),
       ('SK-A-3662', 'Vivero de Flores de Pierre van de Putte en Schenkweg en La Haya', 'Vivero de Flores de Pierre van de Putte en Schenkweg en La Haya, Vincent van Gogh, 1882', 2, TRUE, ARRAY['La Haya'], NULL, NULL, ARRAY['papel','pintura de cubierta','lápiz'], ARRAY['pluma','pincel'], 'pluma', 'Vincent van Gogh (1853-1890), lápiz, pluma y tinta, con aguada y acuarela opaca blanca, sobre papel, 1882', 'Vincent van Gogh decidió convertirse en artista en 1880 e inicialmente practicó el dibujo. En respuesta a un encargo de su tío, el marchante de arte C.M. van Gogh, dibujó una serie de paisajes urbanos de La Haya. El artista no eligió los lugares pintorescos habituales, sino los suburbios de la ciudad, como aquí en Schenkweg, donde él mismo vivía.'),
       ('RP-P-1912-609', 'Los Comedores de Patatas', 'Los Comedores de Patatas, Vincent van Gogh, 1885', 2, TRUE, ARRAY[]::text[], 'Versión litográfica de "Los comedores de patatas" de Van Gogh: una familia campesina alrededor de una mesa, iluminada por una lámpara de aceite, comiendo patatas de un plato.', NULL, ARRAY['papel'], ARRAY['litografía'], 'litografía', 'Vincent van Gogh (1853-1890), litografía en negro, 1885', 'Además de ser pintor y dibujante, Van Gogh también fue grabador. Dibujó esta representación de una versión temprana de Los Comedores de Patatas de memoria en la piedra litográfica. Con la esperanza de obtener algún reconocimiento, sacó una serie de copias de ella. También sintió que al usar un medio diferente, obtendría nueva inspiración para la pintura final.'),
       ('SK-A-128', 'La Masacre de los Inocentes', 'La Masacre de los Inocentes, Cornelis Cornelisz. van Haarlem, 1590', 3, TRUE, ARRAY[]::text[], 'La matanza de niños en Belén. Matanza fuera de las puertas de la ciudad. Soldados desnudos asesinan a los niños con cuchillos y espadas.', NULL, ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Cornelis Cornelisz van Haarlem (1562-1638), óleo sobre lienzo, 1590', 'Cuando Herodes, rey de Judea, se enteró de que nacería un niño destinado a ser "Rey de los Judío" en Belén, ordenó la matanza de todos los niños menores de dos años. El pintor retrató la masacre como una horrible pesadilla. El horror sigue al horror: en la parte inferior izquierda un soldado degüella a un niño, mientras que encima una mujer le saca los ojos a un soldado.'),
       ('SK-A-3016', 'Venus y Marte', 'Venus y Marte, Cornelis Cornelisz. van Haarlem, 1628', 3, TRUE, ARRAY[]::text[], 'Venus y Marte. Marte sostiene a Venus de la mano, ambos están desnudos. A la izquierda dos niños juegan con la armadura (tambor, escudo y espada) de Marte.', NULL, ARRAY['panel','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre panel', 'Cornelis Cornelisz. van Haarlem, 1628, óleo sobre panel', NULL),
       ('SK-A-3892', 'Betsabé en su Tocador', 'Betsabé en su Tocador, Cornelis Cornelisz. van Haarlem, 1594', 3, TRUE, ARRAY[]::text[], 'El tocador de Betsabé. Betsabé bañándose con dos sirvientas, una de ellas una mujer negra. A la izquierda una fuente en forma de mujer desnuda.', NULL, ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Cornelis Cornelisz van Haarlem (1562-1638), óleo sobre lienzo, 1594', 'Betsabé se baña al aire libre asistida por dos sirvientas. El rey David espía a la joven desde el tejado de su palacio e instantáneamente se enamora. En esta pintura, el rey permanece invisible ya que Cornelisz van Haarlem representó la historia del Antiguo Testamento desde su punto de vista. Nosotros, los espectadores, asumimos el papel de David espiando a las tres mujeres desnudas.'),
       ('SK-A-129', 'La Caída del Hombre', 'La Caída del Hombre, Cornelis Cornelisz. van Haarlem, 1592', 3, TRUE, ARRAY[]::text[], 'La caída. Adán y Eva de pie ante el árbol del conocimiento. Una serpiente le ofrece una manzana a Eva. Alrededor de las figuras, toda clase de animales: mono, gato, perro, babosas, erizo, rana, zorro y búho. A la izquierda en el fondo, Adán y Eva son advertidos por Dios de no comer del árbol.', NULL, ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Cornelis Cornelisz van Haarlem (1562-1638), óleo sobre lienzo, 1592', 'En el fondo a la izquierda vemos a Dios (una nube con rostro y manos humanas) amonestando a Adán y Eva. Pueden comer el fruto de todos los árboles, excepto el del "conocimiento del bien y del mal". Tentados por la serpiente (con torso humano), Adán y Eva, sin embargo, comen el fruto prohibido, por lo que fueron expulsados del Paraíso.'),
       ('RP-T-1965-167', 'Estudios de un hombre desnudo sentado y dos mujeres, de medio cuerpo', 'Estudios de un hombre desnudo sentado y dos mujeres, de medio cuerpo, Cornelis Cornelisz. van Haarlem, 1620 - 1625', 3, TRUE, ARRAY[]::text[], NULL, NULL, ARRAY['papel','pintura al óleo (pintura)'], ARRAY[]::text[], 'papel', 'Cornelis Cornelisz. van Haarlem, 1620 - 1625, papel', NULL),
       ('RP-T-1918-351', 'Diana', 'Diana, Abraham Delfos, 1795', 3, TRUE, ARRAY[]::text[], NULL, NULL, ARRAY['papel','tiza','acuarela (pintura)'], ARRAY['pincel'], 'pincel', 'Abraham Delfos, 1795, pincel', NULL),
       ('SK-C-149', 'Una Madre Despiojando el Cabello de su Hijo, Conocido como "La Tarea de una Madr"', 'Una Madre Despiojando el Cabello de su Hijo, Conocido como "La Tarea de una Madr", Pieter de Hooch, c. 1660 - c. 1661', 4, TRUE, ARRAY[]::text[], 'Interior de una habitación con una madre que le quita los piojos del cabello a su hijo, conocido como "Moedertaak". Interior con madre e hijo sentados a la derecha frente a una cama empotrada. A la derecha una silla para niños, a la izquierda un perro sentado en el suelo de baldosas y mirando por la ventana abierta en la habitación de atrás. Encima de la puerta un pequeño cuadro con un paisaje.', 'Una madre está inspeccionando el cabello de su hijo en busca de piojos. Están en un sobrio interior holandés, con azulejos azules de Delft y una cama empotrada. La silla de la derecha es un inodoro para niños, con un orinal incorporado. A través de la puerta vemos la habitación trasera y vislumbramos el jardín. Estas vistas a la distancia eran la especialidad de De Hooch.', ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Pieter de Hooch (1629-c. 1683), óleo sobre lienzo, c. 1658-1660', 'Una madre examina a fondo la cabeza de su hijo en busca de piojos. Realiza su tarea en un sobrio interior holandés, con azulejos azules de Delft y una cama con dosel. En primer plano a la derecha hay una "kakstoel", o silla orinal. A través de la puerta se vislumbra una soleada habitación trasera y un jardín. De Hooch se especializó en este tipo de "vistas a través".'),
       ('SK-A-181', '¿Autorretrato?', '¿Autorretrato?, Pieter de Hooch (atribuido a), 1648 - 1649', 4, TRUE, ARRAY[]::text[], '¿Autorretrato del pintor Pieter de Hooch? Retrato de hombre, busto, con una columna a la derecha.', NULL, ARRAY['panel','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre panel', 'Pieter de Hooch, 1648 - 1649, óleo sobre panel', NULL),
       ('SK-C-147', 'Hombre Entregando una Carta a una Mujer en el Recibidor de una Casa', 'Hombre Entregando una Carta a una Mujer en el Recibidor de una Casa, Pieter de Hooch, 1670', 4, TRUE, ARRAY[]::text[], 'Entrega de una carta en un vestíbulo. En una habitación junto a la ventana, una mujer sentada con un perrito en el regazo. A la derecha se acerca un hombre con una carta en la mano. A la izquierda un perro y vista a través de la puerta abierta hacia el exterior, donde en la calle de un canal (¿Kloveniersburgwal?), un niño juega con un látigo.', NULL, ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Pieter de Hooch (1629-1684), óleo sobre lienzo, 1670', 'Todas las ventanas y puertas de esta casa de canal están abiertas. La luz del día cae sobre la dama de la casa, que está recibiendo una carta. Con efectos de iluminación y figuras, De Hooch dirige nuestra mirada hacia el exterior. Seguimos al perro hasta el canal y a un niño jugando con un látigo, y más allá hacia la calle soleada del lado opuesto. La vista continúa a través de la puerta a la derecha.'),
       ('SK-C-1191', 'Interior con Mujeres junto a un Armario de Lino', 'Interior con Mujeres junto a un Armario de Lino, Pieter de Hooch, 1663', 4, TRUE, ARRAY[]::text[], 'Mientras afuera el sol ilumina completamente las casas de los canales, adentro una niña juega kolf, una especie de hockey. Dos mujeres guardan ropa de lino recién planchada en el armario. El armario de lino tenía un lugar importante en la casa. La dueña de la casa llevaba la llave del armario consigo y "repartía las sábana": ella tenía la última palabra en el hogar.', NULL, ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Pieter de Hooch (1629-c. 1683), óleo sobre lienzo, 1663', 'El sol ilumina las casas del canal afuera, mientras que en el interior más oscuro una niña juega "kolf", una especie de hockey. Dos mujeres apilan ropa de lino recién prensada en un armario. El armario de lino tenía un lugar importante en el hogar. La señora de la casa llevaba su llave consigo y "repartía las sábanas": ella mandaba y estaba a cargo de la casa.'),
       ('SK-A-182', 'Una Criada con un Niño en una Despensa', 'Una Criada con un Niño en una Despensa, Pieter de Hooch, c. 1656 - c. 1660', 4, TRUE, ARRAY[]::text[], 'Una mujer con un niño en una despensa con suelo de baldosas. Una joven le entrega a una niña pequeña una jarra con tapa. A la izquierda y a la derecha, vistas a otras habitaciones. En la habitación de la derecha, la ventana está abierta, junto a la ventana una silla con un cojín, en la pared un cuadro con un retrato de hombre.', NULL, ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Pieter de Hooch (1629-1684), óleo sobre lienzo, c. 1656-1660', 'Una sirvienta muestra a un niño pequeño el contenido de su jarra. En ese momento, todos los niños usaban vestidos con riendas para sujetarlos mientras aprendían a caminar. De Hooch era famoso por sus vistas a través de un espacio a otro. Aquí representó dos: una a la bodega y otra a la habitación delantera, donde pintó la luz del día entrando en blanco puro.'),
       ('SK-A-135', 'El Beber Feliz', 'El Beber Feliz, Frans Hals, c. 1628 - c. 1630', 5, TRUE, ARRAY[]::text[], 'El bebedor alegre. Hombre barbudo y risueño con un gran sombrero negro, de medio cuerpo, con un "berkemeier" en la mano izquierda y la mano derecha levantada. Alrededor del cuello un medallón en una cadena.', 'Este alegre joven está levantando su copa como para proponer un brindis. Aunque la moda en ese entonces era de pinturas intrincadas y detalladas, Hals aplicó sus pinturas con trazos rápidos y seguros. Este estilo de pintura le da al sujeto una verdadera sensación de movimiento. Esto es más obvio con la mano derecha.', ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'óleo sobre lienzo, c. 1629', 'Esta obra es la cúspide del estilo audaz y suelto de Hals. Las pinceladas se entrecruzan en el lienzo, creando la impresión de una ejecución rápida y sugiriendo movimiento. El retratado, probablemente un guardia cívico o un militar, a juzgar por su atuendo, está a punto de levantar su copa para brindar con nosotros.'),
       ('SK-A-133', 'Retrato de un Matrimonio, Probablemente Isaac Abrahamsz Massa y Beatrix van der Laen', 'Retrato de un Matrimonio, Probablemente Isaac Abrahamsz Massa y Beatrix van der Laen, Frans Hals, c. 1622', 5, TRUE, ARRAY[]::text[], 'Retrato matrimonial de Isaac Abrahamsz Massa y Beatrix van der Laen, casados en Haarlem el 25 de abril de 1622. La pareja sentada de cuerpo entero en un estrado bajo un árbol. A la izquierda un cardo, a la derecha hiedra. A la derecha en el fondo, parejas elegantes paseando en un jardín con fuente junto a una casa de campo.', 'El fabulosamente rico mercader de Haarlem y su esposa encargaron a su amigo Frans Hals pintar su retrato de una manera inusual. Las parejas del siglo XVII rara vez aparecen juntas en una sola pintura, especialmente en una pose tan despreocupada. Hals incluyó todo tipo de símbolos de amor en la escena, como el cardo a la izquierda. Un nombre holandés para la planta era "fidelidad del marid".', ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'óleo sobre lienzo, c. 1622', 'Era raro que una pareja casada fuera retratada de tamaño natural y junta en una sola pintura, y aún más en una manera tan íntima y alegre. El patrón habría tenido que ser receptivo a tal innovación. La estrecha amistad entre Hals y la pareja de recién casados, presumiblemente Isaac Abrahamsz Massa y Beatrix van der Laen, probablemente jugó un papel crucial para facilitar la creación de este audaz retrato.'),
       ('SK-C-139', 'Retrato de Maritge Claesdr Vooght', 'Retrato de Maritge Claesdr Vooght, Frans Hals, 1639', 5, TRUE, ARRAY[]::text[], 'Retrato de la cervecera de Haarlem Maritge Claesdr Vooght (1577-1644). De rodillas, sentada en una silla, un libro en la mano derecha. En la pared detrás de ella el escudo de la familia. Probablemente pareja del retrato de su esposo Pieter Jacobsz Olycan (1572-1658), cervecero y alcalde, que se encuentra en el Museo de Arte John y Mable Ringling en Sarasota, Florida.', NULL, ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Frans Hals (c. 1582-1666), óleo sobre lienzo, 1639', 'Maritge Vooght creció en un negocio familiar de cerveceros en Haarlem. Se casó con Pieter Olycan a la edad de 18 años. Su unión le permitió ocupar altos cargos y se convirtió en coheredero de la cervecería. Además, establecieron su propia cervecería, que, como era habitual entonces, fue registrada a nombre de Pieter. Su hija Geertruyt continuó con éxito el negocio familiar. Que eran prósperos lo demuestran la costosa vestimenta de Vooght y el precioso libro de iglesia.'),
       ('SK-A-1247', 'Retrato de Duijfje van Gerwen (1618-1658)', 'Retrato de Duijfje van Gerwen (1618-1658), Frans Hals, c. 1637', 5, TRUE, ARRAY[]::text[], 'Retrato de Duifje van Gerwen (1618-1658), hija menor de un rico comerciante de vinos de Ámsterdam en Warmoesstraat, esposa de Jan van de Poll. Busto a la izquierda, con un gran cuello plisado. Colgante de SK-A-1246.', NULL, ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Frans Hals (c. 1582-1666), óleo sobre lienzo, c. 1637', NULL),
       ('SK-C-374', 'Compañía de la Milicia del Distrito XI bajo el mando del Capitán Reynier Reael', 'Compañía de la Milicia del Distrito XI bajo el mando del Capitán Reynier Reael, Frans Hals, Pieter Codde, 1637', 5, TRUE, ARRAY[]::text[], 'El destacamento del capitán Reijnier Reael y el teniente Cornelis Michielsz Blaeuw, Ámsterdam, 1637, conocido como ''La compañía flaca''. Cuadro de fusileros con dos hombres sentados y el resto de pie. Algunos con un estandarte, alabarda y lanza.', NULL, ARRAY['pintura al óleo (pintura)','lienzo'], ARRAY[]::text[], 'óleo sobre lienzo', 'Frans Hals (1582/84-1666), Pieter Codde (1599-1678), óleo sobre lienzo, 1637', 'Muchas cosas salieron mal con este retrato de la compañía de milicia de Ámsterdam. Hals hizo varios viajes a la capital para retratar a los guardias, pero algunos nunca aparecieron. Finalmente, insistió en que vinieran a Haarlem, pero se negaron, y en su lugar contrataron al pintor de Ámsterdam Pieter Codde para completar la obra. El progreso de Hals sigue sin estar claro, pero la composición y las siete figuras de la izquierda parecen ser en gran parte suyas.'),
       ('SK-A-3059', 'El Niño Enfermo', 'El Niño Enfermo, Gabriël Metsu, c. 1664 - c. 1666', 6, TRUE, ARRAY[]::text[], 'El niño enfermo. Una madre sentada con un niño en su regazo. A la izquierda en una mesa hay una olla con una cuchara, a la derecha hay ropa y un gorro en una silla. En la pared cuelgan un mapa en rollos y un cuadro con una crucifixión.', 'Una madre preocupada mira a su hija pequeña, lánguidamente desplomada en su regazo. Metsu eligió un tema inusual, ya que las representaciones de niños enfermos son raras en el arte del siglo XVII. Quizás pretendía que la madre personificara la caridad, Caritas. Entonces el cuadro de la Crucifixión en la pared sería una referencia específica a Cristo, quien murió por amor al Hombre en la Cruz.', ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Gabriël Metsu (1629-1667), óleo sobre lienzo, c. 1664-1666', 'En 1663, la peste asoló Ámsterdam, cobrándose una de cada diez vidas. Por esta época, Metsu pintó este cuadro de una madre consolando a su hijo enfermo. Su postura evoca una Piedad: la Virgen María con el cuerpo de Jesús en su regazo. El cuadro en la pared, que representa a Cristo en la cruz, sirve como un recordatorio conmovedor de ese sufrimiento.'),
       ('SK-C-177', 'El Regalo del Cazador', 'El Regalo del Cazador, Gabriël Metsu, c. 1658 - c. 1661', 6, TRUE, ARRAY[]::text[], 'El regalo del cazador. Interior con un cazador que sostiene una perdiz cazada para una mujer sentada que está cosiendo. Junto al hombre un gran perro de caza. En la mesa junto a la mujer hay un perrito. En el fondo un armario sobre el que hay una estatuilla de Cupido. En la pared un cuadro. En primer plano un rifle de caza y un pato muerto. A la derecha una escalera de caracol.', NULL, ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Gabriel Metsu (1629-1667), óleo sobre lienzo, c. 1658-1661', 'Esta mujer, dedicada a la costura, reflexiona sobre una proposición romántica. Mira pensativa al pájaro que le presenta un cazador esperanzado. En el siglo XVII, "cazar pájaros" era un eufemismo para hacer el amor. De ahí que la estatuilla de Cupido, el dios del amor, adorne el armario. Atrapada entre la fe y el placer, duda, con los ojos en la ave, pero extiende la mano hacia el libro de oraciones sobre la mesa.'),
       ('SK-A-249', 'Hombre y Mujer en la Mesa del Desayuno', 'Hombre y Mujer en la Mesa del Desayuno, Gabriël Metsu, 1650 - 1660', 6, TRUE, ARRAY[]::text[], 'Hombre y mujer comiendo. Un hombre y una mujer sentados en una mesa puesta. El hombre coge un vaso, la mujer vierte de una jarra en un vaso alto. En la mesa un plato con jamón, queso y pan.', NULL, ARRAY['lienzo','panel','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo sobre panel', 'Gabriel Metsu (1629-1667), óleo sobre lienzo sobre panel, 1650-1660', 'Sobre la mesa hay un plato con jamón, queso y pan. Para la familia promedio, este era un desayuno típico, a veces complementado con pescado. La mujer está a punto de servir cerveza en su vaso de flauta. En esos días, la gente apenas bebía agua, sin embargo, la cerveza era bastante popular y se bebía durante todo el día. Las mujeres dominaban los oficios de panadería y cervecería.'),
       ('SK-C-560', 'Mujer Comiendo, Conocida como "El Desayuno del Gat"', 'Mujer Comiendo, Conocida como "El Desayuno del Gat", Gabriël Metsu, c. 1661 - c. 1664', 6, TRUE, ARRAY[]::text[], 'Una mujer sentada come un arenque con pan, un gato que salta hacia ella recibe la espina del pescado. Escena conocida como ''El desayuno del gato''. A la izquierda una bomba de agua, en primer plano un barril sobre el que yace un pollo muerto, a la derecha un jarrón con flores sobre una mesita.', NULL, ARRAY['panel','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre panel', 'Gabriel Metsu (1629-1667), óleo sobre panel, c. 1661-1664', 'Una mujer de origen humilde comparte su comida con un gato. En el siglo XVII no era inusual consumir arenque con pan (¡y cerveza!) para el desayuno. Debido al envejecimiento, el pigmento amarillo de los tallos de las flores en el jarrón ha desaparecido, volviendo el color verde original a azul.'),
       ('SK-A-2156', 'El Herrero de Armas', 'El Herrero de Armas, Gabriël Metsu, 1650 - 1660', 6, TRUE, ARRAY[]::text[], 'El armero. un herrero y su ayudante trabajando en una herrería. El herrero golpea un trozo de hierro en el yunque con un martillo. El ayudante está junto a la estufa. En primer plano hay herramientas y piezas de una armadura.', NULL, ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Gabriël Metsu, 1650 - 1660, óleo sobre lienzo', NULL),
       ('SK-A-4981', 'Adolf y Catharina Croeser, Conocidos como "El Burgomaestre de Delft y su Hij"', 'Adolf y Catharina Croeser, Conocidos como "El Burgomaestre de Delft y su Hij", Jan Havicksz. Steen, 1655', 7, TRUE, ARRAY[]::text[], 'Un hombre vestido de negro sentado en los escalones de una casa en Oude Delft, con una carta en su mano izquierda. Una joven ricamente vestida, posiblemente su hija, baja los escalones. Una anciana con ropa gastada y un niño a su lado se dirigen al hombre. Al fondo la torre de la Oude Kerk.', 'Con las piernas abiertas, la mano en la cadera, Croeser se sienta cómodamente en la entrada de su casa en Oude Delft en Delft. Su hija Catharina, de 13 años, nos mira directamente. Jan Steen añadió un elemento narrativo al retrato: mendigos pidiendo limosna al rico comerciante de granos. Dos años después, en 1657, Croeser actuó como garante de Steen, quien en ese momento estaba profundamente endeudado.', ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY['pintura'], 'óleo sobre lienzo', 'Jan Havicksz Steen (c. 1625-1679), óleo sobre lienzo, 1655', 'Con las piernas abiertas y el brazo derecho en jarras, Croeser se sienta en la entrada de su casa en el canal Oude Delft en Delft. Su hija Catharina, de trece años, nos mira directamente. Jan Steen incluyó un elemento narrativo en este retrato: una mujer y un niño pobres pidiendo limosna al rico comerciante de granos. En 1657, apenas dos años después de que se hiciera este retrato, Croeser avaló a Steen, quien estaba gravemente endeudado.'),
       ('SK-C-229', 'La Familia Alegre', 'La Familia Alegre, Jan Havicksz. Steen, 1668', 7, TRUE, ARRAY[]::text[], 'La familia alegre o "Como los viejos cantaban, los jóvenes silban". Interior con una familia alrededor de una mesa, que se divierte con música, canto y bebida. A la izquierda en la ventana un niño con una pipa y una trompa, en la mesa un anciano cantando con una copa levantada, un hombre tocando una gaita, dos mujeres cantando de un trozo de papel, un niño con una cuchara, un niño con una flauta y un niño y una niña fumando una pipa. Delante de la mesa un niño recibe un sorbo de vino de una jarra. En el suelo un perro, jarras, un plato y una cacerola.', 'Jóvenes y viejos se lo están pasando de maravilla: madre y abuela cantan, los niños tocan música y fuman, y el padre levanta su copa. La nota en la repisa de la chimenea comenta conmovedoramente: "como los viejos cantan, así silban los jóvene". El cuadro de Steen da vida al dicho y advierte al espectador: si los padres dan un mal ejemplo, los hijos los seguirán.', ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Jan Havicksz Steen (1626-1679), óleo sobre lienzo, 1668', 'Toda la familia está de buen humor, haciendo alboroto: padre, madre y abuela cantan a voz en cuello, los niños se unen e incluso fuman largas pipas. La nota en la repisa de la chimenea insinúa que hay una lección que aprender de esta pintura: "Como canten los viejos, así piarán los jóvenes". ¿Qué será de los niños si sus padres dan el ejemplo equivocado?'),
       ('SK-A-383', 'Autorretrato', 'Autorretrato, Jan Havicksz. Steen, c. 1670', 7, TRUE, ARRAY[]::text[], 'Jan Steen se retrató a sí mismo como un artista seguro de sí mismo, elegantemente vestido de negro, con una cortina drapeada al fondo. Con este tipo de autorretrato siguió el ejemplo de maestros famosos como Tiziano y Rembrandt. El retrato es una excepción en la obra de Steen. Por lo general, se pintaba a sí mismo en el papel de comediante.', NULL, ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Jan Havicksz Steen (c. 1625-1679), óleo sobre lienzo, c. 1670', 'Un ciudadano distinguido vestido de negro decoroso está sentado frente a una cortina roja y una borla. Jan Steen, conocido principalmente por sus escenas humorísticas con gente sencilla, se retrató aquí a sí mismo con total seguridad. También se incluyó regularmente en otras pinturas, pero entonces usualmente en un papel cómico.'),
       ('SK-A-3509', 'La adoración de los pastores', 'La adoración de los pastores, Jan Havicksz. Steen, 1660 - 1679', 7, TRUE, ARRAY[]::text[], 'La adoración de los pastores. Una procesión de pastores entra al establo para adorar al niño. En primer plano, María sentada con el Niño Jesús en un pesebre con paja. A la izquierda, un pastorcillo enciende un fuego. Detrás del buey y el asno, una anciana le da a José una cesta de huevos. A la derecha, un pastor toca la gaita, junto a él un niño con un gallo.', NULL, ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Jan Havicksz. Steen, 1660 - 1679, óleo sobre lienzo', NULL),
       ('SK-A-387', 'El charlatán', 'El charlatán, Jan Havicksz. Steen, 1650 - 1660', 7, TRUE, ARRAY[]::text[], 'El charlatán. En una plaza del pueblo, un charlatán se encuentra en una plataforma bajo un gran árbol, mostrando a los aldeanos el diente (o piedra) que ha extraído a un hombre atado a una silla. A los pies del hombre hay una cesta con huevos. Sobre la mesa hay botellas y frascos de todo tipo y un documento con un sello. A la derecha, en primer plano, una mujer empuja a su marido borracho en una carretilla. En el extremo derecho, un violín cuelga de un poste sobre el que un mono sentado fuma una pipa.', NULL, ARRAY['panel','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre panel', 'Jan Havicksz. Steen, 1650 - 1660, óleo sobre panel', NULL),
       ('SK-A-393', 'Hombre con un violín en mala compañía', 'Hombre con un violín en mala compañía, Jan Havicksz. Steen (copia de), 1670 - 1700', 7, TRUE, ARRAY[]::text[], 'Hombre con violín en mala compañía. En una mesa frente a una posada, un hombre alegre con un violín, mientras una anciana le ofrece un vaso y sostiene un molinillo, una joven con un cancionero le roba dinero de la bolsa. A la derecha, un joven con pipa observa.', NULL, ARRAY['panel','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre panel', 'Jan Havicksz. Steen, 1670 - 1700, óleo sobre panel', NULL),
       ('SK-A-2565', 'Naturaleza Muerta con Libros', 'Naturaleza Muerta con Libros, Jan Davidsz. de Heem, c. 1628 - c. 1629', 8, TRUE, ARRAY[]::text[], 'Naturaleza muerta: sobre una mesa de madera en la esquina de una habitación hay varios libros y papeles. En la esquina, un laúd apoyado en la pared.', NULL, ARRAY['panel','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre panel', 'Jan Davidsz de Heem (1606-1683), óleo sobre panel, c. 1625-1630', 'Tonos grises y marrones dominan esta composición, y una sombra se extiende lentamente sobre la pared. La pintura alude a la fugacidad de la vida. Los libros maltratados aluden a la transitoriedad. La música producida por el laúd es momentánea, un símbolo de la brevedad de la vida. Una referencia literal a la muerte está inscrita en la hoja de papel colgada sobre el borde de la mesa: "fini" ([el] fin).'),
       ('SK-A-2396', 'Un Pintor Fumando una Pipa', 'Un Pintor Fumando una Pipa, Adriaen Brouwer (seguidor de), 1630 - 1640', 8, TRUE, ARRAY[]::text[], 'Un pintor, de medio cuerpo, sentado frente a un cuadro en el caballete, fumando una pipa.', NULL, ARRAY['panel','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre panel', 'Adriaen Brouwer, 1630 - 1640, óleo sobre panel', NULL),
       ('SK-A-138', 'Guirnalda de Frutas y Flores', 'Guirnalda de Frutas y Flores, Jan Davidsz. de Heem, 1660 - 1670', 8, TRUE, ARRAY[]::text[], 'Guirnalda de frutas (uvas, limones, granada, ciruelas, cerezas, moras) y flores (entre ellas, rosas), colgando de un anillo frente a un nicho. Además, hojas, una rama con castañas, escarabajos, mariposas y caracoles.', NULL, ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Jan Davidsz de Heem (1606-c. 1683), óleo sobre lienzo, 1660-1670', 'En 1626, este pintor nacido en Utrecht se mudó a Amberes, donde se familiarizó con la suntuosa y colorida pintura flamenca de naturalezas muertas. Combinó esta influencia con su don para representar la naturaleza con minucioso detalle. Esto se puede ver claramente en esta guirnalda floral y frutal: una entidad altamente decorativa que, sin embargo, está meticulosamente detallada. Todo tipo de insectos hambrientos pueblan esta naturaleza muerta.'),
       ('SK-A-139', 'Naturaleza Muerta con Frutas y una Langosta', 'Naturaleza Muerta con Frutas y una Langosta, Jan Davidsz. de Heem (copia de), 1640 - 1700', 8, TRUE, ARRAY[]::text[], 'Bodegón con frutas y una langosta. En la pared cuelga una guirnalda de frutas. Sobre la mesa un plato chino con uvas, melocotón y albaricoques. A la izquierda un limón pelado. Entre las frutas toda clase de insectos y caracoles. Copia antigua del original de Dresde.', NULL, ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Jan Davidsz. de Heem, 1640 - 1700, óleo sobre lienzo', NULL),
       ('SK-C-214', 'Naturaleza Muerta con Flores en un Jarrón de Cristal', 'Naturaleza Muerta con Flores en un Jarrón de Cristal, Jan Davidsz. de Heem, 1650 - 1683', 8, TRUE, ARRAY[]::text[], 'Naturaleza muerta con flores en un jarrón de cristal sobre una tabla de piedra. Ramo con, entre otros, bella de día, rosa (blanca, rosa), trigo, cicuta, clavel (rojo-blanco), narciso de racimo, adormidera, tulipán (rojo-blanco), guisante de olor, rosa de perro, madreselva, fritillaria, rosa de Gueldre, anémona (roja) y en el zócalo una anémona (roja), además una mariposa vanessa, una oruga de mariposa psi, una oruga geométrica, escarabajos, hormigas y otros insectos, arañas y un caracol de jardín.', NULL, ARRAY['cobre (metal)','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre cobre', 'Jan Davidsz. de Heem, 1650 - 1683, óleo sobre cobre', NULL),
       ('SK-A-1233', 'Pintura de Techo con Diana y sus Compañeras', 'Pintura de Techo con Diana y sus Compañeras, Gerard de Lairesse, c. 1676 - c. 1682', 9, TRUE, ARRAY[]::text[], 'Pintura de techo en cinco partes con la representación principal de Diana y sus compañeras, pintada para la "gran sala" del Palacio Soestdijk. Tras la restauración en 1983, la pieza central redonda no resultó ser parte de la pintura de techo original ni obra de De Lairesse. Los cuatro elementos de las esquinas contienen elementos arquitectónicos ilusionistas y relieves, entre los cuales se encuentran las mujeres con atributos de caza y putti. El anillo interior con un relieve clásico con escenas de caza y una escena de sacrificio a Diana es sostenido por cariátides.', NULL, ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY['pintura'], 'óleo sobre lienzo', 'Gerard de Lairesse (1641-1711), óleo sobre lienzo, c. 1676-1682', 'De Lairesse pintó este techo para el Gran Salón del Palacio de Soestdijk, que Guillermo III utilizaba como pabellón de caza en ese momento. La escena de Diana, la diosa de la caza, alude a esto. De Lairesse amplió la arquitectura de la sala con esta pintura ilusionista de una cúpula ricamente decorada. El programa decorativo de la sala constituía así una unidad, una ambición que marcaría la pauta para el arte del siglo XVIII.'),
       ('SK-A-2115', 'El Banquete de Cleopatra', 'El Banquete de Cleopatra, Gerard de Lairesse, c. 1675 - c. 1680', 9, TRUE, ARRAY[]::text[], 'El banquete de Cleopatra. A la derecha Cleopatra yace en la mesa con los senos desnudos, a la izquierda Marco Antonio sentado. Alrededor de la mesa hay varios invitados y miembros de la corte. Se representa el momento en que Lucius Plancus impide que Cleopatra tome una segunda perla de su arete para disolverla en su vino. Marco Antonio pierde así la apuesta sobre quién podía dar el banquete más caro. En el suelo delante de la mesa hay un perro de caza. Al fondo la arquitectura del interior del palacio con cariátides.', NULL, ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Gerard de Lairesse (c. 1675-c. 1680), óleo sobre lienzo, c. 1675-1680', '¿Quién podría ofrecer el banquete más lujoso? Esta fue la apuesta entre la faraona egipcia Cleopatra y el general romano Marco Antonio. Cleopatra ganó la apuesta disolviendo una perla en vinagre y luego bebiendo la mezcla. En esta pintura, ella está justo quitándose el arete. De Lairesse pintó esta historia como una escena de una obra de teatro, con trajes antiguos y arquitectura clásica.'),
       ('SK-A-211', 'Odiseo y Calipso', 'Odiseo y Calipso, Gerard de Lairesse, c. 1680', 9, TRUE, ARRAY[]::text[], 'Odiseo con Calipso. La diosa desnuda abraza a Odiseo. Un Amor coloca un casco emplumado en su cabeza. Al fondo una cortina tendida ante un árbol.', NULL, ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Gerard de Lairesse (1641-1711), óleo sobre lienzo, c. 1680', 'El poeta griego Homero cuenta cómo el heroico guerrero Odiseo encontró refugio en la isla de la ninfa Calipso. La Guerra de Troya ha terminado: Amor, el dios del amor, ahora le coloca burlonamente el casco de batalla en la cabeza a Calipso. Odiseo y Calipso se enamoran instantáneamente. Esta pintura colgaba en el pabellón de caza de Soestdijk, en el apartamento de María Estuardo, la consorte de Guillermo III.'),
       ('SK-A-1840', 'La Última Cena', 'La Última Cena, Gerard de Lairesse, c. 1664 - c. 1665', 9, TRUE, ARRAY[]::text[], 'La última cena. Cristo con sus discípulos sentados alrededor de una mesa. A la izquierda un sirviente sirve vino de una jarra.', NULL, ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Gerard de Lairesse, c. 1664 - c. 1665, óleo sobre lienzo', NULL),
       ('SK-A-615', 'Granida y Daiphilo', 'Granida y Daiphilo, Gerard de Lairesse, c. 1665 - c. 1668', 9, TRUE, ARRAY[]::text[], 'Granida y Daifilo. Granida bebe agua de una fuente con una concha. Junto a la fuente se sienta el pastor Daifilo, su armadura yace en el suelo frente a la fuente. A la derecha dos putti jugando.', NULL, ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Gerard de Lairesse, c. 1665 - c. 1668, óleo sobre lienzo', NULL),
       ('SK-A-212', 'Mercurio Ordenando a Calipso que Libere a Odiseo', 'Mercurio Ordenando a Calipso que Libere a Odiseo, Gerard de Lairesse, c. 1680', 9, TRUE, ARRAY[]::text[], 'Mercurio ordena a Calipso que deje marchar a Odiseo. En primer plano un Amor posa con el casco y las armas de Odiseo.', NULL, ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Gerard de Lairesse (1641-1711), óleo sobre lienzo, c. 1680', 'Durante sus andanzas, Odiseo encuentra a la ninfa Calipso, quien se enamora de él y lo mantiene cautivo en su isla. Júpiter entonces envía a Mercurio para ordenarle que deje que Odiseo regrese con su esposa. Lairesse hizo esta pintura, junto con varias otras obras que representan amor y devoción ejemplares, para los apartamentos de María Estuardo en el Palacio de Soestdijk.'),
       ('SK-A-2382', 'Hijos del Mar', 'Hijos del Mar, Jozef Israëls, 1872', 10, TRUE, ARRAY[]::text[], 'Representación titulada "Hijos del mar". Cuatro niños juegan con un barco de juguete de vela en el agua de la playa. El niño mayor lleva a un niño en la espalda.', 'Esta deliciosa escena contiene una moraleja. Estos niños de un pobre pueblo pesquero, con sus ropas gastadas y juguetes rotos, están representando su propio futuro. El niño mayor carga con el peso de su familia sobre sus hombros, mientras que el barco representa la dura vida en el mar. Jozef Israëls pintó por primera vez el tema en 1863. Fue enormemente popular y lo repitió a menudo.', ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Jozef Israëls (1824-1911), óleo sobre lienzo, 1872', 'Esta encantadora escena contiene un mensaje. Los hijos de un pescador, con sus harapos desgastados y juguetes insignificantes, nos ofrecen un vistazo de su futuro. El niño mayor carga con el peso de la familia sobre sus hombros, y el pequeño barco representa los rigores de la vida en el mar. Jozef Israëls pintó este tema por primera vez en 1863. Se hizo enormemente popular y el artista lo repitió a menudo.'),
       ('SK-A-1179', '"Solo en el Mundo"', '"Solo en el Mundo", Jozef Israëls, 1878', 10, TRUE, ARRAY[]::text[], 'Representación titulada "Solo en el mundo". Interior de una vivienda sencilla en la que una mujer llorando está sentada en una silla junto a una cama empotrada en la que yace una persona fallecida (¿su marido?). Junto a la silla un brasero sobre el que yace una biblia abierta. A la derecha en la pared un reloj, a la izquierda una silla y una mesa junto a un armario junto a una ventana.', NULL, ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Jozef Israëls, 1878, óleo sobre lienzo', NULL),
       ('SK-A-3731', 'David', 'David, Jozef Israëls, 1899', 10, TRUE, ARRAY[]::text[], 'David tocando un arpa. De una serie de cinco estudios para un cuadro de Saúl y David de 1899 (ver también SK-A-3730, SK-A-4180, SK-A-4198 y SK-A-3732).', NULL, ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Jozef Israëls, 1899, óleo sobre lienzo', NULL),
       ('SK-A-2599', 'Una Escena de Laren', 'Una Escena de Laren, Jozef Israëls, 1905', 10, TRUE, ARRAY[]::text[], 'Una niña sentada en la puerta de una vivienda pelando patatas. A través de la puerta se ven algunos árboles y una casa. Pintado en los alrededores de Laren.', NULL, ARRAY['lienzo','pintura al óleo (pintura)'], ARRAY[]::text[], 'óleo sobre lienzo', 'Jozef Israëls (1824-1911), óleo sobre lienzo, 1905', 'Laren fue uno de los lugares favoritos de los pintores de la Escuela de La Haya. Israëls fue allí a partir de 1874, cuando el pueblo de pequeños propietarios y pastores todavía era completamente auténtico. Una vez que los pintores lo descubrieron, Laren se convirtió en una verdadera colonia de artistas y, posteriormente, en un imán turístico. Israëls habrá pintado esta encantadora escena de una niña en la abertura de una puerta en gran parte de memoria.'),
       ('SK-A-2598', 'Boda Judía', 'Boda Judía, Jozef Israëls, 1903', 10, TRUE, ARRAY[]::text[], 'Una boda judía. La pareja de novios bajo el manto de oración, el novio desliza el anillo en el dedo de su novia. A la izquierda un anciano con sombrero de copa junto a una vela encendida, alrededor de la pareja se encuentran los invitados de la boda.', NULL, ARRAY['pintura al óleo (pintura)','lienzo'], ARRAY[]::text[], 'óleo sobre lienzo', 'Jozef Israëls, 1903, óleo sobre lienzo', NULL);   

--Tabla intermedia entre artObjects y objectTypes
CREATE TABLE artObjectsTypes (
    IdArtObjectsTypes SERIAL PRIMARY KEY,
    IdArtObject INTEGER REFERENCES artObjects (IdArtObject),
    IdObjectType INTEGER REFERENCES objectTypes (IdObjectType),
    UNIQUE (IdArtObject, IdObjectType)
);

INSERT INTO artObjectsTypes (IdArtObject, IdObjectType) VALUES
    (1, 1),(2, 1),(3, 1),(4, 1),(5, 1),
    (6, 1),(7, 1),(8, 2),(9, 3),(10, 1),
    (11, 1),(12, 1),(13, 1),(14, 2),(15, 2),
    (16, 1),(17, 1),(18, 1),(19, 1),(20, 1),
    (21, 1),(22, 1),(23, 1),(24, 1),(25, 1),
    (26, 1),(27, 1),(28, 1),(29, 1),(30, 1),
    (31, 1),(32, 1),(33, 1),(34, 1),(35, 1),
    (36, 1),(37, 1),(38, 1),(39, 1),(40, 1),
    (41, 1),(42, 1),(42, 4),(43, 1),(44, 1),
    (45, 1),(46, 1),(47, 1),(48, 1),(49, 1),
    (50, 1),(51, 1),(52, 1);

-- Tabla de datos de imagen
CREATE TABLE webImages (
    IdWebImage SERIAL PRIMARY KEY,
    IdArtObject INTEGER REFERENCES artObjects (IdArtObject),
    width INTEGER,
    height INTEGER,
    url TEXT
);

INSERT INTO webImages (IdArtObject, width, height, url)  VALUES 
    (1, 4351, 5754, 'https://lh3.googleusercontent.com/AyiKhdEWJ7XmtPXQbRg_kWqKn6mCV07bsuUB01hJHjVVP-ZQFmzjTWt7JIWiQFZbb9l5tKFhVOspmco4lMwqwWImfgg=s0'),
    (2, 7620, 5542, 'https://lh3.googleusercontent.com/mAyAjvYjIeAIlByhJx1Huctgeb58y7519XYP38oL1FXarhVlcXW7kxuwayOCFdnwtOp6B6F0HJmmws-Ceo5b_pNSSQs=s0'),
    (3, 14645, 12158, 'https://lh3.googleusercontent.com/SsEIJWka3_cYRXXSE8VD3XNOgtOxoZhqW1uB6UFj78eg8gq3G4jAqL4Z_5KwA12aD7Leqp27F653aBkYkRBkEQyeKxfaZPyDx0O8CzWg=s0'),
    (4, 10201, 12064, 'https://lh3.googleusercontent.com/NrCcfeY0r2F3M2hIQe5SLDRofR2tVzeOH18VjflOYGj88v4clb4v2H_VgCZR4nJhYsxxH9ATzfkL2tRqOWEK5-gPVEE=s0'),
    (5, 10880, 7372, 'https://lh3.googleusercontent.com/gShVRyvLLbwVB8jeIPghCXgr96wxTHaM4zqfmxIWRsUpMhMn38PwuUU13o1mXQzLMt5HFqX761u8Tgo4L_JG1XLATvw=s0'),
    (6, 4487, 5558, 'https://lh3.googleusercontent.com/Ckjq-HkB2XhEsbuMsei0MR5fLTODfkcXY8qQTG-XLHVxE0jLO9DnSYaVE8n1kCrcm9AMKzoWB2w03LrY0v7eoj5hYw=s0'),
    (7, 5670, 3950, 'https://lh3.googleusercontent.com/rN30IB00bIGEgTm9OFA9U0yf4if6y7RhdKqvOVKd2Gf1wLmmqyCRP7Ok_QlJML5PPaZHyWnKN1vcPjcb_EC0pu63Xi0=s0'),
    (8, 3928, 2792, 'https://lh6.ggpht.com/RvKoP3sO4nXgRlIvSGLDcezVPQoaNOukS8uvv2JRUrhMbMV9VBD0bLFOA9vmg44Nq1Lh9VNLx0oxM1FnzT7a4RO3Tmdx=s0'),
    (9, 5586, 4528, 'https://lh6.ggpht.com/GlyQgIZEno8P_XhZK1yTsMk9Po_unNgU1u1mESDluU372mItxNAiQ_VUUOzpMoTQz564buak-FJkUGDdQfFDxppftEA=s0'),
    (10, 4012, 2726, 'https://lh5.ggpht.com/JH0svNh0Pkov_W97MDHw8v2-qKS8AdixVJ-CiPL_xBECNdEyTBkicMvZBsqgW6GQ0TB9moKnfGUYacWQS32rqeoEjA4=s0'),
    (11, 3708, 2798, 'https://lh6.ggpht.com/IPCna6aG-CMsEcbDfmP2X4wdItAzjs5_UaKtg8QzuhT56PIUHSC8CCGekIg1BEdAG7uCCkawEXXt4YRYMP-Mxrdd7esQ=s0'),
    (12, 2880, 3544, 'https://lh6.ggpht.com/JszrZwjtXRYH7wx_B8ekGZYWRO5XzdhmVyougknWXAWPGR5TDW8Sitv8uZM_fmNm-VG3Bhhigk74dWSiQddIdKpz4w=s0'),
    (13, 4718, 5730, 'https://lh3.googleusercontent.com/735D6PqhkkKpWuXg5unq0HiovKboVmL1z9YcfWpeHhhK5XmpbW0JoP0_SMuL1O-6FGtNXSEqoDSv587kmacKPwutog=s0'),
    (14, 4036, 6150, 'https://lh4.ggpht.com/g4sln1Tqd2dlAsqGswCoc94ndDBgJGGzD45A7obx4Jux40QKTHeYsfqWaPa4m5MqIS43P5Rob3_QmPBA1tHvyWOpp3SB=s0'),
    (15, 4608, 5828, 'https://lh4.ggpht.com/Acs4OVKhLAMnPpxaqOWc2CAXFKOijH6egsTKHNawZ8qDhed-qERwhRy4R7CT7IU3XsArmXs1f17ZAt9jap9AA7l4xQ=s0'),
    (16, 15761, 13647, 'https://lh3.googleusercontent.com/6Vm9nYrTeeYe5wl7lOafEHUnbzNF8KJw3ZbV_cNBr_wQTyHyp1DJxEWEEK3OSuji9XGYx04r15HTVPu850WeFcOd0ZVv=s0'),
    (17, 5913, 5722, 'https://lh3.googleusercontent.com/G-2Kq--PhOubyfXjS8WFbEnJ3pYkC139uaYvSYh_bruQxl69pT20ulCTLUF6nCUV3yS4fueYpbPHJGmEb45h2eb9kFlnE1qHT7Y4whna=s0'),
    (18, 5609, 6439, 'https://lh3.googleusercontent.com/X0jwI-mE8trCVGcbZZJqOxeZhIKlVcG2cWhGcCfCwi4s-1b1hyb_olXEZLEcCpK76Su3nVLjYgdD4DPoGeSbofgx0Y6KKJqnqBGHAPXq=s0'),
    (19, 6250, 5713, 'https://lh3.googleusercontent.com/7aWk-x_VNb_Y1-X8C38nVnZAgmyAGUWDmOIAYiHKVtZG55xUggHFjQ-8l49nCuF_VJFFh2W57yMJrRq2SVNctSFYL7o=s0'),
    (20, 5838, 6249, 'https://lh3.googleusercontent.com/5HyCvI9V8cj41z9iLdosXvrriM9Nf-UHAvlqYjGswdPIR26J76pjjUvsLI0K2OWLeV5jEu1mW9h2kuEn1W-xdWnqWg=s0'),
    (21, 4639, 5551, 'https://lh3.googleusercontent.com/bMCQgUbifzAl-How19Ru06KYgdVuND2pdYzY81zIx3MJ0ld6yqzPnWLVUOu0Aj1JNgK-lFDT2CSjfmQ-erpBdJ6AM4XGAwuQoivxWpJ8=s0'),
    (22, 6964, 5923, 'https://lh3.googleusercontent.com/yfH3HoYjUOOXNic6f9V3KSgtFGQYxU3lyqsi08F7P8GVHW12saX8oW_sApbSTgTBv-ctXUqCLM82FgHzUamP9Z-ozhCJZKZkb2U3F13z=s0'),
    (23, 4784, 6379, 'https://lh3.googleusercontent.com/Lj1gbiiCOTsWyfYP-7FIzbXWpvJZGFffZ4OLDKE6OauUezaf87kUxlCNm9ADH5H0LGhWkdjE2amdMFHknZSGGK5pVbrERfVlkHs0WqEF=s0'),
    (24, 4660, 5685, 'https://lh3.googleusercontent.com/k8whv6UpR3jyb7bRrQ5kWXZ_kDtJRsibDPccIaw7IJIcgweBt9nDG7njJDsARrP95Q4hmV_hhqN1QI9s2Xe-WSWApawzKM8LXCrcxD4=s0'),
    (25, 7874, 4035, 'https://lh3.googleusercontent.com/_z81MaJKdNIvtniyZhBuzH0Hz5ZeOotpklfJ5AugmBOwJcP4_o-fxZPmaSsGwUAZrI1F8V8rG1PqP5gQQB2_b_cSKhaha8glrOyCmo_7=s0'),
    (26, 4443, 5479, 'https://lh3.googleusercontent.com/SCp0xV3Rwxh3ipnuSnbEQR_uGrHlsvHXlLD-5kVSjAE7WPWiribDB77_LcJETu4EydCC_jMuhsgjz4maHzY_t-xeiw=s0'),
    (27, 4475, 4735, 'https://lh3.googleusercontent.com/3-2wRaQukl63EDga9voOoHV0p9ij4MyMchhi0rdVy9HDRjH3kwGq0751KFByzQD8iH5Z7WITn-aKZ_VwsqtujujZwgc=s0'),
    (28, 4079, 4495, 'https://lh3.googleusercontent.com/4g5jKOu1ms3FVc-RL5PY1V-dydmQDctuciX-_jdeTTnwV_uYzPpFms_aHWwcbtIEGPEQjrHVWYK5NsjnGy7syNqzCg=s0'),
    (29, 4340, 5386, 'https://lh3.googleusercontent.com/o9Z4Ix06fsq8DhpL8q8u3Ln0lVNmnTB_5L98WDRoEpUdRTR94zaNJEveT9tgS3Bzy7BzsD7CzwS_aXSiY7hbuT7GIH4=s0'),
    (30, 4628, 5529, 'https://lh3.googleusercontent.com/979oAEqvoTmcUzm_AQItyQxTcrqvkjeaP6gdFWmZUY_B7HBtb22ovqsP-HUb_lzf6ArBvJ9E0-HkZFoxR6T5_5Db2wg=s0'),
    (31, 4732, 5639, 'https://lh3.googleusercontent.com/fLsffYqD3Ex7F8C3l3C2mvQYQZJg7F9tYWn2XSwnDtvx0UMd3SDX_nN-Z--vdsMmg4p8NEwXiONStvmOV5ggcnagc3UM=s0'),
    (32, 5876, 4619, 'https://lh3.googleusercontent.com/7JF0tll1eAfY8XgFHJ6Iq_e1xux4xgcT8_LxMfVbZdRMC5CX5KsXLH1DLlMEfuTfKX8kehtmhJyzJSBFEBDPFmeB6Y8=s0'),
    (33, 4301, 4939, 'https://lh3.googleusercontent.com/GVIL4z8-zb4iicaLy6yTkANAdQFrhrekjQBXS-hRZd6a7WO3AswhwwymmnAGHnMJTh428-8NomtZ4gOU9Bqa5mTT-g=s0'),
    (34, 6580, 5452, 'https://lh4.ggpht.com/zgIcfcroz7EHi9SX2cnorZjfSEYfs1Hsc0khoIhbUSgp7SGgBRBPeW7Igy39Gd8y6RlGvMDWpu3jkdQmp_tl2Qe50Q=s0'),
    (35, 4908, 3582, 'https://lh4.ggpht.com/zAE1BbYdL6HsRDOHT64lo1CZ_VnIoNT4fls5xHkoRvRe-eokOOjDmc98-3HqXvD2PX-jeItMLockO9ctp7Pvbkyln7Q=s0'),
    (36, 5189, 6217, 'https://lh6.ggpht.com/meGZ1xUwDCT3q8ILstMypwEJmFTxZFFVJJKEvM73PTf5NWACaOrEf2mgqsUHf4hOkz9IGwj_f7ZdxEaRBapkpDnftsk=s0'),
    (37, 5784, 3703, 'https://lh3.googleusercontent.com/Jq-ZhL8kU6AFoC5F804qAYSG6kmrBKMZRwtYj92wh3KfS_100G1hKXTfLy-Zm5yq2kbCNv6TZRtyVVRGjgidsvtdaO-T=s0'),
    (38, 5269, 6877, 'https://lh3.googleusercontent.com/S1OU6wbMgNEZgkdWGxy6CvC1I3eg_HqKKvwrU5xLObLOaQ3yLRkeFMSy5yahlqOWe59us-cFOM92HouLDYgzGKlMhGs=s0'),
    (39, 4470, 5577, 'https://lh3.googleusercontent.com/RXnCCOk53g6rXEPxVOWPjgTEqKzU0AUaLtXPT7-6ArjUeYueBsIvVZPnsqx0pEdHni8er7oagIHk2jlB4-U3a_kP5rg=s0'),
    (40, 4398, 5444, 'https://lh3.googleusercontent.com/pqA7r3sKIWDyC0MbR0CNoqJPeZXFavoE1wy0MjTHEPQqc4EID0Qs77BTD6g0O_ee6SKGQGTurRU50AaXsT5M8NO5K7s=s0'),
    (41, 5411, 7968, 'https://lh3.googleusercontent.com/_gkvrwgCC-JpNkZRpv0IM0giM23DnBm8a5kS_dc_nhE1gZmxGM_wJIGnwFr8tVFURhao5SuWUxOkwniEcvWottBGuN4=s0'),
    (42, 5112, 5112, 'https://lh3.googleusercontent.com/OQ6J2e-jOfZd--X2nb7NBi_Op22YaZ08LM72oPykl77spWmw8eCxIckny5XTSWOZaidhBmyXZrkDHATKmbGEzxIxP-M=s0'),
    (43, 6505, 5097, 'https://lh3.googleusercontent.com/ZRK3FDOXtvZEF29nWrrH06BRErXcbWweoODvCwwLZXdahoY7bovCmuTd_r40NXOuXxPeLimVoj4szse8e16S7nTQsFE=s0'),
    (44, 4548, 5865, 'https://lh3.googleusercontent.com/eEXtKKWftZ91jTqT_jpu-04NX7Mj6rVmYJ9f1S2ceH8UcaN-FnabYb69WolisLdfVH9hEVry521Z7hYDqbgikHk5LA=s0'),
    (45, 3682, 2794, 'https://lh4.ggpht.com/e7JTBhWEzb9xnyIk1QK24WvTudkyJmPQQphkKbjf1uQ4z_wPskub9PFoXpJ4FbsUtZ65lH7dMVL_LNGOZFu-v5s2cTzc=s0'),
    (46, 3728, 3082, 'https://lh4.ggpht.com/moZIF62mFzyPi4KoNEwn2QHCBl24Ok9io-sx75r5btSSNhethlpPNpMwnenSdbYVVENaqgZIrY5Y4PxPahlQjoLBdQ=s0'),
    (47, 4774, 6475, 'https://lh3.googleusercontent.com/LR3384G5nFfv5374iNaQDYWFk6PKxE9BeZ0ENdwTI3SOX-9zieQdM-mO30DU-AUTbQdri9SjKkD1mypciAEtQYWGcw=s0'),
    (48, 6026, 3074, 'https://lh3.googleusercontent.com/BMvxPb9RF9F-qz68PAIIrROTp7G352oNEzZWmmT-H1YXSgf2Id33oQBssFYnPL52KwiyFgYY1pSInpEVrhrx1OViFQ=s0'),
    (49, 6484, 4160, 'https://lh3.googleusercontent.com/4tgoskwO9m4hYr77rCktm3yCS444JQ1OaR64oW8jyiL6mbvYHqFUqnPOBjmFvXA_BkQ61O0fMATibMAd0O-gkBXgzg=s0'),
    (50, 2594, 3964, 'https://lh3.ggpht.com/Kry5WHhQ42VIAawhB-shJkPe4QPzqFZ4X_aJAAslrdNmwZmhiEP0rzULbKfgMN5rE5960rTlRKKkzwY1EszWv4rp2yJ8=s0'),
    (51, 4327, 5643, 'https://lh3.googleusercontent.com/yEZBqXhxnnrQCA38zw9MDtWhTf0aqyTA6Q2gjVTUJbHAa1YMBF480VeAf2G_2dMzDmc6FcvlAfb5q4U1Euo17vralQ=s0'),
    (52, 14222, 13202, 'https://lh6.ggpht.com/L5nRI_u-_6f1XFEo-xXTZJAzsxRROedg4oMcBFU32ugj5dMREuf9nv0wAYlgGJfp6kJB7KvxLCspbyXGLS0gCIceoFU=s0');


-- Tabla de fechas de las obras
CREATE TABLE datings (
    IdDating SERIAL PRIMARY KEY,
    IdArtObject INTEGER REFERENCES artObjects (IdArtObject),
    presentingDate VARCHAR(255),
    sortingDate INT,
    period INT,
    yearEarly INTEGER,
    yearLate INTEGER
);
    
INSERT INTO datings (IdArtObject, presentingDate, sortingDate, period, yearEarly, yearLate)  VALUES 
    (1, '1639', 1639, 17, 1639, 1639),
    (2, 'c. 1665 - c. 1669', 1665, 17, 1665, 1669),
    (3, '1642', 1642, 17, 1642, 1642),
    (4, '1661', 1661, 17, 1661, 1661),
    (5, '1662', 1662, 17, 1662, 1662),    
    (6, '1887', 1887, 19, 1887, 1887),
    (7, '1884', 1884, 19, 1884, 1884),
    (8, '1882', 1882, 19, 1882, 1882),    
    (9, '1885', 1885, 19, 1885, 1885),    
    (10, '1590', 1590, 16, 1590, 1590), 
    (11, '1628', 1628, 17, 1628, 1628),    
    (12, '1594', 1594, 16, 1594, 1594),
    (13, '1592', 1592, 16, 1592, 1592),
    (14, '1620 - 1625', 1620, 17, 1620, 1625),
    (15, '1795', 1795, 18, 1795, 1795),
    (16, 'c. 1660 - c. 1661', 1660, 17, 1660, 1661),
    (17, '1648 - 1649', 1648, 17, 1648, 1649),
    (18, '1670', 1670, 17, 1670, 1670),
    (19, '1663', 1663, 17, 1663, 1663),
    (20, 'c. 1656 - c. 1660', 1656, 17, 1656, 1660),   
    (21, 'c. 1628 - c. 1630', 1628, 17, 1628, 1630),
    (22, 'c. 1622', 1622, 17, 1622, 1622),    
    (23, '1639', 1639, 17, 1639, 1639),
    (24, 'c. 1637', 1637, 17, 1637, 1637),
    (25, '1637', 1637, 17, 1637, 1637),
    (26, 'c. 1664 - c. 1666', 1664, 17, 1664, 1666),
    (27, 'c. 1658 - c. 1661', 1658, 17, 1658, 1661),
    (28, '1650 - 1660', 1650, 17, 1650, 1660),
    (29, 'c. 1661 - c. 1664', 1661, 17, 1661, 1664),
    (30, '1650 - 1660', 1650, 17, 1650, 1660),
    (31, '1655', 1655, 17, 1655, 1655),
    (32, '1668', 1668, 17, 1668, 1668),
    (33, 'c. 1670', 1670, 17, 1670, 1670),
    (34, '1660 - 1679', 1660, 17, 1660, 1679),
    (35, '1650 - 1660', 1650, 17, 1650, 1660),
    (36, '1670 - 1700', 1670, 17, 1670, 1700), 
    (37, 'c. 1628 - c. 1629', 1628, 17, 1628, 1629),
    (38, '1630 - 1640', 1630, 17, 1630, 1640),
    (39, '1660 - 1670', 1660, 17, 1660, 1670),
    (40, '1640 - 1700', 1640, 17, 1640, 1700),
    (41, '1650 - 1683', 1650, 17, 1650, 1683),
    (42, 'c. 1676 - c. 1682', 1676, 17, 1676, 1682),   
    (43, 'c. 1675 - c. 1680', 1675, 17, 1675, 1680),
    (44, 'c. 1680', 1680, 17, 1680, 1680),
    (45, 'c. 1664 - c. 1665', 1664, 17, 1664, 1665),
    (46, 'c. 1665 - c. 1668', 1665, 17, 1665, 1668),   
    (47, 'c. 1680', 1680, 17, 1680, 1680),  
    (48, '1872', 1872, 19, 1872, 1872),  
    (49, '1878', 1878, 19, 1878, 1878),
    (50, '1899', 1899, 19, 1899, 1899),
    (51, '1905', 1905, 20, 1905, 1905),
    (52, '1903', 1903, 20, 1903, 1903);

-- Tabla de titulos alternativos
CREATE TABLE otherTitles (
    IdOtherTitle SERIAL PRIMARY KEY,
    IdArtObject INTEGER REFERENCES artObjects (IdArtObject),
    alternativeTitle TEXT,
    titleType TEXT
);
   
INSERT INTO otherTitles (IdArtObject, alternativeTitle, titleType) VALUES 
    (1, 'Retrato de una mujer, posiblemente Maria Trip', 'alternativo'),
    (1, 'Retrato de una mujer, probablemente Maria Trip', 'alternativo'),
    (2, 'Retrato de una pareja como Isaac y Rebeca, conocido como ''La novia judía''', 'alternativo'),
    (2, 'Retrato de una pareja como figuras del Antiguo Testamento, conocido como ''La novia judía''', 'alternativo'),
    (3, 'Oficiales y otros miembros de la guardia civil del Distrito II en Ámsterdam, bajo el mando del Capitán Frans Banninck Cocq y el Teniente Willem van Ruytenburch, conocido como "La ronda de noche"', 'alternativo'),
    (3, 'La compañía del Capitán Frans Banninck Cocq y el Teniente Willem van Ruytenburch, conocido como ''La ronda nocturna''', 'alternativo'),
    (4, 'Autorretrato como el Apóstol Pablo', 'alternativo'),
    (5, 'Los síndicos del Gremio de Pañeros de Ámsterdam, conocido como ''Los síndicos''', 'alternativo'),
    (5, 'Los síndicos: los oficiales de control (inspectores) de los pañeros de Ámsterdam', 'alternativo'),
    (6, 'Autorretrato', 'alternativo'),
    (7, 'Aldea agrícola al anochecer', 'alternativo'),
    (8, 'Vivero de flores en el Schenkweg en La Haya', 'alternativo'),
    (10, 'La masacre de los inocentes', 'alternativo'),
    (11, 'Venus y Marte', 'alternativo'),
    (12, 'Betsabé en el baño', 'alternativo'),
    (13, 'La caída del hombre', 'alternativo'),
    (14, 'Estudios de un hombre desnudo sentado y dos mujeres, hasta la mitad del cuerpo', 'alternativo'),
    (15, 'Diana', 'alternativo'),
    (16, 'Interior con una madre despiojando el cabello de su hijo, conocido como ''El deber de una madre''', 'alternativo'),
    (17, '¿Autorretrato?', 'alternativo'),
    (18, 'Hombre entregando una carta a una mujer en el vestíbulo de una casa', 'alternativo'),
    (19, 'Interior con mujeres junto a un armario de lino', 'alternativo'),
    (19, 'Interior con mujeres junto a un cofre de lino', 'alternativo'),
    (20, 'Mujer con un niño en una despensa', 'alternativo'),
    (21, 'Un miembro de la guardia civil sosteniendo una copa Berkemeier, conocido como ''El bebedor alegre''', 'alternativo'),
    (21, 'El bebedor alegre', 'alternativo'),
    (22, 'Retrato de una pareja en un paisaje, probablemente Isaac Abrahamsz Massa (1586-1643) y Beatrix van der Laen (1592-1639)', 'alternativo'),
    (22, 'Retrato de boda de Isaac Abrahamsz Massa (1586-1643) y Beatrix van der Laen (1592-1639), casados en Haarlem el 25 de abril de 1622', 'alternativo'),
    (23, 'Retrato de Maritge Claesdr Vooght (1577-1644)', 'alternativo'),
    (23, 'Maritge Claesdr Voogt (1577-1644), esposa de Pieter Jacobsz Olycan, burgomaestre de Haarlem', 'alternativo'),
    (24, 'Retrato de Duijfje van Gerwen (1618-1658)', 'alternativo'),
    (24, 'Retrato de una mujer', 'alternativo'),
    (24, 'Retrato de una mujer, posiblemente Sara Wolphaerts van Diemen (1594-1667), segunda esposa de Nicolaes Hasselaer', 'alternativo'),
    (25, 'Oficiales y otros miembros de la guardia del XI Distrito de Ámsterdam, bajo el mando del Capitán Reijnier Reael y el Teniente Cornelis Michielsz Blaeuw, conocido como ''La Compañía Flaca''', 'alternativo'),
    (25, 'La compañía del Capitán Reynier Reael y el teniente Cornelis Michielsz Blaeuw, Ámsterdam, 1637, conocida como ''La Compañía Flaca''', 'alternativo'),
    (28, 'Hombre y mujer en una comida', 'alternativo'),
    (30, 'El armero', 'alternativo'),
    (32, 'La familia alegre', 'alternativo'),
    (33, 'Autorretrato', 'alternativo'),
    (34, 'La adoración de los pastores', 'alternativo'),
    (35, 'El charlatán', 'alternativo'),
    (36, 'Hombre con un violín en mala compañía', 'alternativo'),
    (37, 'Bodegón con libros', 'alternativo'),
    (38, 'Un pintor fumando una pipa', 'alternativo'),
    (39, 'Guirnalda de frutas y flores', 'alternativo'),
    (40, 'Bodegón con frutas y una langosta', 'alternativo'),
    (41, 'Bodegón con flores en un florero de vidrio', 'alternativo'),
    (42, 'Decoración de techo en cinco partes para el Gran Salón del Palacio de Soestdijk', 'alternativo'),
    (43, 'El banquete de Cleopatra', 'alternativo'),
    (44, 'Ulises y Calipso', 'alternativo'),
    (44, 'Marte y Venus', 'alternativo'),
    (45, 'La última cena', 'alternativo'),
    (46, 'Granida y Daiphilo', 'alternativo'),
    (47, 'Mercurio ordenando a Calipso liberar a Ulises', 'alternativo'),
    (48, 'Niños del mar', 'alternativo'),
    (49, '''Sola en el mundo''', 'alternativo'),
    (50, 'David', 'alternativo'),
    (51, 'Una escena de la vida en Laren', 'alternativo'),
    (52, 'Boda judía', 'alternativo'),
    (52, 'Boda judía, se cree que es la boda de la hija del artista Mathilde y G.D. Cohen Tervaert, 1903', 'alternativo');

CREATE TABLE userDevs (
  IdUserDev SERIAL PRIMARY KEY,
  developerName VARCHAR(100) NOT NULL,
  developerEmail VARCHAR(100) UNIQUE NOT NULL,
  apiKeyHash VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'pendiente',
  createdAt TIMESTAMP DEFAULT NOW()
);