--
-- Insert values into table reports.
--
DELETE FROM reports;

INSERT INTO reports
    (title, report)
VALUES
    ('Kmom01', '# my-project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
'),
    ('Kmom02', 'Inspirationen till min date-picker fick jag från att titta på några olika alternativ på internet, bland annat från den här sidan:
https://www.smashingmagazine.com/2017/07/designing-perfect-date-time-picker/

Jag gjorde så att man kunde välja mellan att klicka fram födelseåret, genom att klicka på upp- eller nerpilen, eller att själv skriva in det. Månaden väljs i en rullista och beroende på vilken månad som väljs ändras antalet dagar som är tillgängliga att välja - t.ex. kan man inte välja dag 31 i en månad som bara innehåller 30 dagar.')
;

-- Insert Kmom03 and Kmom04
INSERT INTO reports
    (title, report)
VALUES
    ('Kmom03', 'I det här kursmomentet har jag bland annat bråkat med backenden. Att få den att skicka data till frontenden. Den här lilla texten till exempel.'),
    ('Kmom04', '3st use-cases att testa:
1. Från förstasidan ska det gå att trycka på en länk för att se redovisningstexten för Kursmoment 1.
2. Det ska gå att trycka på en länk för att skapa nya redovisningstexter. Om man inte är inloggad ska det på denna sida stå en text att man behöver logga in.
3. Det ska gå att trycka på en länk för att ta sig till ett logga in-formulär.
')
;
