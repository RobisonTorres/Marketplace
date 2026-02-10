INSERT IGNORE INTO brands (id, name) VALUES 
(1, 'SONY'), (2, 'LG'), (3, 'Brastemp');

INSERT IGNORE INTO cars (id, model, fabrication, color, mileage, plate, price, status, brand_id) VALUES
(1, 'Playstation 5', 2024, 'White', 1, 'X49F35', 299.00, 'NEW', 1),
(2, 'Smart TV', 2025, 'Black', 2, 'TV490', 199.00, 'SECOND_HAND', 1),
(3, 'Monitor Gamer', 2026, 'Black', 1, 'MTGMR', 79.00, 'SECOND_HAND', 2),
(4, 'Refrigerator', 2024, 'Silver', 40, 'REF0A', 250.00, 'NEW', 3);

INSERT IGNORE INTO photos (photo, car_id) VALUES
('https://webfones.vtexassets.com/arquivos/ids/252949-800-800?v=638990029957600000&width=800&height=800&aspect=true', 1),
('https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/1/0/1000050614.jpg', 1),
('https://m.media-amazon.com/images/I/51rLyCJiz7L._AC_UF1000,1000_QL80_.jpg', 2),
('https://m.media-amazon.com/images/I/71pme7j9JLL._AC_UF350,350_QL80_.jpg', 2),
('https://www.lg.com/content/dam/channel/wcms/br/images/produtos/it/24gs60f-b/1-1600-24gs60f.jpg/jcr:content/renditions/thum-1600x1062.jpeg?w=800', 3),
('https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/2/4/24ms500-b.jpg', 3),
('https://cdn.leroymerlin.com.br/products/geladeira_brastemp_frost_free_french_door_a____554_litros_cor_1570592434_12a0_600x600.png', 4),
('https://cdn.leroymerlin.com.br/products/geladeira_brastemp_frost_free_french_door_a____554_litros_cor_1570592434_58e4_600x600.jpg', 4);