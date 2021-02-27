<template>
    <b-col class="border border-dark">
                            
        <b-tabs content-class="mt-3">
            <b-tab title="Ich" active>
                
                <b-container fluid>
                    <b-row class="ich-tab">
                        <b-col sm="2">
                            <label for="textfeld-1">Berichten / Reagieren </label>
                        </b-col>
                        <b-col sm="10">
                        <b-form-textarea
                            id="textfeld-1"
                            placeholder="Wählen Sie aus, worüber Sie reflektieren wollen: Gab es einen Vorfall, der Ihnen besonders positiv im Gedächtnis geblieben ist? Ist ein Problem oder eine Herausforderung aufgetreten? Fassen Sie zusammen, was vorgefallen ist. Warum ist dieser Vorfall für Sie relevant?"
                            
                        ></b-form-textarea>

                        
                        <br>
                        </b-col>

                        

                        <b-col sm="2">
                            <label for="textfeld-2">In Bezug setzen </label>
                        </b-col>
                        <b-col sm="10">
                        <b-form-textarea
                            id="textfeld-2"
                            placeholder="Setzen Sie den Vorfall bzw. das Problem mit Ihren eigenen Kenntnissen, Fertigkeiten, Erfahrung oder fachlichem Wissen in Verbindung. Ist Ihnen ein ähnlicher Vorfall schon einmal begegnet? Waren die Umstände gleich oder unterschiedlich? Haben Sie die Fähigkeiten und das Wissen, um damit umzugehen? Erläutern Sie."
                            
                        ></b-form-textarea>
                        <br>
                        </b-col>
                

                        <b-col sm="2">
                            <label for="textfeld-3">Schlussfolgern </label>
                        </b-col>
                        <b-col sm="10">
                        <b-form-textarea
                            id="textfeld-3"
                            placeholder="Rekonstruieren Sie zukünftiges Handeln in Bezug auf den Vorfall bzw. das Problem. Wie würden Sie beim nächsten Mal vorgehen? Welche Ansätze könnten funktionieren und wieso? Gibt es verschiedene Optionen, aus denen Sie wählen können? Welches Ergebnis erwarten Sie?"
                            
                        ></b-form-textarea>

                        <br>

                        </b-col>


                        <b-col sm="2">
                            <label for="textfeld-4">Rekonstruieren </label>
                        </b-col>
                        <b-col sm="10">
                        <b-form-textarea
                            id="textfeld-4"
                            placeholder="Rekonstruieren Sie zukünftiges Handeln in Bezug auf den Vorfall bzw. das Problem. Wie würden Sie beim nächsten Mal vorgehen? Welche Ansätze könnten funktionieren und wieso? Gibt es verschiedene Optionen, aus denen Sie wählen können? Welches Ergebnis erwarten Sie?"
                            
                        ></b-form-textarea>

                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>

                        </b-col>

                        <b-col>
                        <b-button>Zum Dashboard</b-button>
                        </b-col>
                   

                        <b-col>
                        </b-col>
                        <b-col>
                        <b-button>Speichern</b-button>
                        

                        </b-col>



                    </b-row>

                    

                </b-container>

                
            </b-tab>
            <b-tab title="Gruppe & Zusammenarbeit" active> Gruppe & Zusammenarbeit </b-tab>
            <b-tab title="Fachlicher Kontext (Literaturreview)" active> Fachlicher Kontext </b-tab>
        </b-tabs>





    </b-col>
</template>