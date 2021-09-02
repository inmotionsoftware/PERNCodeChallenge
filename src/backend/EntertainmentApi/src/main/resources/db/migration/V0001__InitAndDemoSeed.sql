create table if not exists person (
    person_id bigserial primary key,
    name varchar not null,
    location varchar(512),
    born date not null,
    died date,
    description varchar not null,
    thumbnail_asset varchar
);

create table if not exists movie (
    movie_id bigserial primary key,
    created_at date not null,
    updated_at date,
    title varchar(512) not null,
    rating_classification varchar(32),
    description varchar,
    release_date date,
    runtime interval hour to minute,
    avg_rating real
);

create table if not exists cast_role (
    movie_id bigint references movie(movie_id) on delete cascade,
    person_id bigint references person(person_id) on delete cascade,
    primary key(movie_id, person_id)
);

insert into movie (created_at, title, rating_classification, description, release_date, runtime, avg_rating)
values  (now(), 'The Babadook', null, 'A single mother and her child fall into a deep well of paranoia when an eerie children''s book titled ''Mister Babadook'' manifests in their home.', to_date('17 January 2014', 'DD Month YYYY'), interval '1 hour 35 minutes', 6.8),
        (now(), 'Guns Akimbo', 'R', 'A guy relies on his newly-acquired gladiator skills to save his ex-girlfriend from kidnappers.', to_date('9 September 2019', 'DD Month YYYY'), interval '1 hour 40 minutes', 6.3),
        (now(), 'Horns', 'R', 'In the aftermath of his girlfriend''s mysterious death, a young man awakens to find strange horns sprouting from his forehead.', to_date('6 September 2013', 'DD Month YYYY'), interval '2 hours 3 minutes', 6.5);

insert into person (name, location, born, died, description)
values  ('Essie Davis', 'Hobart, Tasmania, Australia', to_date('January 7 1970', 'Month DD YYYY'), null, 'An actress and producer, married with two children. She graduated from Australia''s National Institute of Dramatic Art (NIDA) with a degree in Performing Arts (Acting) in 1992.'),
        ('Noah Wiseman', 'Australia', to_date('November 12 2008', 'Month DD YYYY'), null, 'A child actor known for thier role in `The Babadook`.'),
        ('Daniel Radcliffe', 'Fulham, London, England, UK', to_date('July 23 1989', 'Month DD YYYY'), null, 'Child of casting agent Marcia Gresham (née Jacobson) and literary agent Alan Radcliffe. His father is from a Northern Irish Protestant background, while his mother was born in South Africa, to a Jewish family (from Lithuania, Poland, Russia, and Germany). Daniel began performing in small school productions as a young boy. Soon enough, he landed a role in David Copperfield (1999), as the young David Copperfield. A couple of years later, he landed a role as Mark Pendel in The Tailor of Panama (2001), the son of Harry and Louisa Pendel (Geoffrey Rush and Jamie Lee Curtis). Curtis had indeed pointed out to Daniel''s mother that he could be Harry Potter himself. Soon afterwards, Daniel was cast as Harry Potter by director, Chris Columbus in the film that hit theaters in November 16, 2001, Harry Potter and the Sorcerer''s Stone (2001). He was recognized worldwide after this film was released. Pleasing audiences and critics everywhere, filming on its sequel, Harry Potter and the Chamber of Secrets (2002), commenced shortly afterwards. He appeared again as Harry in Harry Potter and the Prisoner of Azkaban (2004) directed by Alfonso Cuarón, and then appeared in Harry Potter and the Goblet of Fire (2005) directed by Mike Newell. Shortly afterwards, he finished filming December Boys (2007) in Adelaide, Australia, Kangaroo Island, and Geelong, Australia which began on the 14 November 2005 and ended sometime in December. On January 27, 2006, he attended the South Bank Awards Show to present the award for ''Breakthrough Artist of the Year'' to Billie Piper. Daniel reprised his famous character once again for the next installment of the Harry Potter series, Harry Potter and the Order of the Phoenix (2007). In February 2007, he took on his first stage role in the West End play Equus, to worldwide praise from fans and critics alike. Also that year, he starred in the television movie My Boy Jack (2007), which aired on 11 November 2007 in the UK. After voicing a character in an episode of the animated television series The Simpsons in late 2010, Radcliffe debuted as J. Pierrepont Finch in the 2011 Broadway revival How to Succeed in Business Without Really Trying, a role previously held by Broadway veterans Robert Morse and Matthew Broderick. Other cast members included John Larroquette, Rose Hemingway and Mary Faber. Both the actor and production received good reviews, with USA Today commenting: ''Radcliffe ultimately succeeds not by overshadowing his fellow cast members, but by working in conscientious harmony with them - and having a blast in the process.'' Radcliffe''s performance in the show earned him Drama Desk Award, Drama League Award and Outer Critics Circle Award nominations. The production itself later received nine Tony Award nominations. Radcliffe left the show on 1 January 2012. His first post-Harry Potter project was the 2012 horror film The Woman in Black, adapted from the 1983 novel by Susan Hill. The film was released on 3 February 2012 in the United States and Canada, and was released on 10 February in the UK. Radcliffe portrays a man sent to deal with the legal matters of a mysterious woman who has just died, and soon after he begins to experience strange events from the ghost of a woman dressed in black. He has said he was ''incredibly excited'' to be part of the film and described the script as ''beautifully written''. In 2013, he portrayed American poet Allen Ginsberg in the thriller drama Kill Your Darlings (2013), directed by John Krokidas. He also starred in an Irish-Canadian romantic comedy film The F Word directed by Michael Dowseand written by Elan Mastai, based on TJ Dawe and Michael Rinaldi''s play Toothpaste and Cigars and then he starred in an American dark fantasy horror film directed by Alexandre Aja Horns. Both of the films premiered at the 38th Toronto International Film Festival. Radcliffe also performed at the Noël Coward Theatre in the stage play revival of Martin McDonagh''s dark comedy The Cripple of Inishmaan as the lead, Billy Claven, for which he won the WhatsOnStage Award for Best Actor in a Play. In 2015, Radcliffe starred as Igor in a science fiction horror film Victor Frankenstein (2015), directed by Paul McGuigan and written by Max Landis, which was based on contemporary adaptations of Mary Shelley''s 1818 novel Frankenstein. In 2016, he appeared as a wealthy villain in the mystery/action film Now You See Me 2 (2016), and as an oftentimes mobile corpse in the indie fantasy Swiss Army Man (2016). Now being one of the world''s most recognizable people, Daniel leads a somewhat normal life. He has made friends working on the Harry Potter films, which include his co-stars Rupert Grint and Emma Watson.');

insert into cast_role (movie_id, person_id)
values  ((select movie_id from movie where title = 'The Babadook'), (select person_id from person where name = 'Essie Davis')),
        ((select movie_id from movie where title = 'The Babadook'), (select person_id from person where name = 'Noah Wiseman')),
        ((select movie_id from movie where title = 'Guns Akimbo'), (select person_id from person where name = 'Daniel Radcliffe')),
        ((select movie_id from movie where title = 'Horns'), (select person_id from person where name = 'Daniel Radcliffe'));