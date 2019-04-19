import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/course';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/user';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/course.service';
import { DataService } from 'src/app/data.service';
import { AuthenticationService } from 'src/app/authentication.service';


@Component({
  selector: 'app-check-symptoms',
  templateUrl: './check.symptoms.component.html'
})
export class CheckSymptomsComponent implements OnInit {

     symptomsMatrix:any = {
        symptoms: [
            {
                name:'Abdominal pain',
                visible : false,
                factors: [
                    {detail: 'Burning', cause: [
                        {name: 'Gastritis', link : 'https://www.mayoclinic.org/diseases-conditions/gastritis/symptoms-causes/syc-20355807' },
                        {name: 'Nonulcer stomach pain', link : 'https://www.mayoclinic.org/diseases-conditions/nonulcer-stomach-pain/symptoms-causes/syc-20375709' }
                    ], comment: 'Find a doctor', visible : false }, 
                    {detail: 'Crampy', cause: [
                        {name: 'Appendicitis', link : 'https://www.mayoclinic.org/diseases-conditions/appendicitis/symptoms-causes/syc-20369543'}, 
                        {name: 'Colon cancer', link : 'https://www.mayoclinic.org/diseases-conditions/colon-cancer/symptoms-causes/syc-20353669'}, 
                        {name: 'Constipation', link : 'https://www.mayoclinic.org/diseases-conditions/constipation/symptoms-causes/syc-20354253' },
                        {name: 'Food poisoning', link : 'https://www.mayoclinic.org/diseases-conditions/food-poisoning/symptoms-causes/syc-20356230' }, 
                        {name: 'Lactose intolerance', link : 'https://www.mayoclinic.org/diseases-conditions/lactose-intolerance/symptoms-causes/syc-20374232' }
                    ], comment: 'Find a doctor', visible : false }, 
                    {detail: 'Intense', cause: [
                        {name: 'Kidney stones', link : 'https://www.mayoclinic.org/diseases-conditions/kidney-stones/symptoms-causes/syc-20355755' },
                        {name: 'Pancreatitis', link : 'https://www.mayoclinic.org/diseases-conditions/pancreatitis/symptoms-causes/syc-20360227' }
                    ], comment: 'Find a doctor', visible : false }
                ],
                
            },
            {
                name:'Chest pain',
                visible : false,
                factors: [
                    {detail: 'Achy or gnawing', cause: [
                        {name: 'Angina', link : 'https://www.mayoclinic.org/diseases-conditions/angina/symptoms-causes/syc-20369373' },
                        {name: 'Costochondritis', link : 'https://www.mayoclinic.org/diseases-conditions/costochondritis/symptoms-causes/syc-20371175' },
                        {name: 'Pericarditis', link : 'https://www.mayoclinic.org/diseases-conditions/pericarditis/symptoms-causes/syc-20352510' }
                    ], comment: 'Find a doctor', visible : false }, 
                    {detail: 'Burning', cause: [
                        {name: 'Esophageal spasms', link : 'https://www.mayoclinic.org/diseases-conditions/esophageal-spasms/symptoms-causes/syc-20372250' }, 
                        {name: 'Gastroesophageal reflux disease (GERD)', link : 'https://www.mayoclinic.org/diseases-conditions/gerd/symptoms-causes/syc-20361940' }, 
                        {name: 'Heartburn', link : 'https://www.mayoclinic.org/diseases-conditions/heartburn/symptoms-causes/syc-20373223' }
                    ], comment: 'Find a doctor', visible : false }, 
                    {detail: 'Severe', cause: [
                        {name: 'Pericarditis', link : 'https://www.mayoclinic.org/diseases-conditions/pericarditis/symptoms-causes/syc-20352510' },
                        {name: 'Pleurisy', link : 'https://www.mayoclinic.org/diseases-conditions/pleurisy/symptoms-causes/syc-20351863' },
                        {name: 'Pulmonary embolism', link : 'https://www.mayoclinic.org/diseases-conditions/pulmonary-embolism/symptoms-causes/syc-20354647' }
                    ], comment: 'Find a doctor', visible : false }, 
                    {detail: 'Sudden', cause: [
                        {name: 'Panic attacks and panic disorder', link : 'https://www.mayoclinic.org/diseases-conditions/panic-attacks/symptoms-causes/syc-20376021' }
                    ], comment: 'Find a doctor', visible : false }
                ],
                
            },
            {
                name:'Cough',
                visible : false,
                factors: [
                    {detail: 'Cough is dry', cause: [
                        {name: 'Acute sinusitis', link : 'https://www.mayoclinic.org/diseases-conditions/acute-sinusitis/symptoms-causes/syc-20351671' }, 
                        {name: 'Asthma', link : 'https://www.mayoclinic.org/diseases-conditions/asthma/symptoms-causes/syc-20369653' }, 
                        {name: 'Common cold', link : 'https://www.mayoclinic.org/diseases-conditions/common-cold/symptoms-causes/syc-20351605' },
                        {name: 'Emphysema', link : 'https://www.mayoclinic.org/diseases-conditions/emphysema/symptoms-causes/syc-20355555' }, 
                        {name: 'Pneumonia', link : 'https://www.mayoclinic.org/diseases-conditions/pneumonia/symptoms-causes/syc-20354204' }
                    ], comment: 'Find a doctor', visible : false }, 
                    {detail: 'Cough is producing phlegm or sputum', cause: [
                        {name: 'Bronchitis', link : 'https://www.mayoclinic.org/diseases-conditions/bronchitis/symptoms-causes/syc-20355566' },
                        {name: 'Chronic sinusitis', link : 'https://www.mayoclinic.org/diseases-conditions/chronic-sinusitis/symptoms-causes/syc-20351661' }
                    ], comment: 'Find a doctor', visible : false }
                ],
                
            },
            {
                name:'Diarrhea',
                visible : false,
                factors: [
                    {detail: 'Ongoing or recurrent (weeks to years)', cause: [
                        {name: 'Celiac disease', link : 'https://www.mayoclinic.org/diseases-conditions/celiac-disease/symptoms-causes/syc-20352220' },
                        {name: 'Irritable bowel syndrome', link : 'https://www.mayoclinic.org/diseases-conditions/irritable-bowel-syndrome/symptoms-causes/syc-20360016' },
                        {name: 'Lactose intolerance', link : 'https://www.mayoclinic.org/diseases-conditions/lactose-intolerance/symptoms-causes/syc-20374232' }
                    ], comment: 'Find a doctor', visible : false }, 
                    {detail: 'Recent (days to weeks)', cause: [
                        {name: 'Antibiotic-associated diarrhea', link : 'https://www.mayoclinic.org/diseases-conditions/antibiotic-associated-diarrhea/symptoms-causes/syc-20352231' },
                        {name: 'Travelers diarrhea', link : 'https://www.mayoclinic.org/diseases-conditions/travelers-diarrhea/symptoms-causes/syc-20352182' },
                        {name: 'Viral gastroenteritis (stomach flu)', link : 'https://www.mayoclinic.org/diseases-conditions/viral-gastroenteritis/symptoms-causes/syc-20378847' }
                    ], comment: 'Find a doctor', visible : false }, 
                    {detail: 'Sudden (hours to days)', cause: [
                        {name: 'Food poisoning', link : 'https://www.mayoclinic.org/diseases-conditions/food-poisoning/symptoms-causes/syc-20356230' },
                        {name: 'Giardia infection (giardiasis)', link : 'https://www.mayoclinic.org/diseases-conditions/giardia-infection/symptoms-causes/syc-20372786' },
                        {name: 'Intestinal obstruction', link : 'https://www.mayoclinic.org/diseases-conditions/intestinal-obstruction/symptoms-causes/syc-20351460' },
                        {name: 'Ischemic colitis', link : 'https://www.mayoclinic.org/diseases-conditions/ischemic-colitis/symptoms-causes/syc-20374001' }
                    ], comment: 'Findoctor', visible : false}
                ],
                
            },
            {
                name:'Dizziness',
                visible : false,
                factors: [
                    {detail: 'A spinning sensation', cause: [
                        {name: 'Ear infection (middle ear)', link : 'https://www.mayoclinic.org/diseases-conditions/ear-infections/symptoms-causes/syc-20351616' },
                        {name: 'Migraine', link : 'https://www.mayoclinic.org/diseases-conditions/migraine-headache/symptoms-causes/syc-20360201' }
                    ], comment: 'Find a doctor', visible : false }, 
                    {detail: 'Lightheaded or faint', cause: [
                        {name: 'Carbon monoxide poisoning', link : 'https://www.mayoclinic.org/diseases-conditions/carbon-monoxide/symptoms-causes/syc-20370642' }, 
                        {name: 'Heart arrhythmia', link : 'https://www.mayoclinic.org/diseases-conditions/heart-arrhythmia/symptoms-causes/syc-20350668' },
                        {name: 'Heart attack', link : 'https://www.mayoclinic.org/diseases-conditions/heart-attack/symptoms-causes/syc-20373106' }, 
                        {name: 'Panic attacks and panic disorder', link : 'https://www.mayoclinic.org/diseases-conditions/panic-attacks/symptoms-causes/syc-20376021' }
                    ], comment: 'Find a doctor', visible : false }, 
                    {detail: 'Unsteady', cause: [
                        {name: 'Acoustic neuroma', link : 'https://www.mayoclinic.org/diseases-conditions/acoustic-neuroma/symptoms-causes/syc-20356127' },
                        {name: 'Stroke', link : 'https://www.mayoclinic.org/diseases-conditions/stroke/symptoms-causes/syc-20350113' }
                    ], comment: 'Find a doctor', visible : false }
                ],
                
            },
            {
                name:'Difficulty swallowing',
                visible : false,
                factors: [
                    {detail: 'Hurts', cause: [
                        {name: 'Esophageal cancer', link : 'https://www.mayoclinic.org/diseases-conditions/esophageal-cancer/symptoms-causes/syc-20356084' },
                        {name: 'Mouth cancer', link : 'https://www.mayoclinic.org/diseases-conditions/mouth-cancer/symptoms-causes/syc-20350997' }
                    ], comment: 'Find a doctor', visible : false }, 
                    {detail: 'Takes effort', cause: [
                        {name: 'Dry mouth', link : 'https://www.mayoclinic.org/diseases-conditions/dry-mouth/symptoms-causes/syc-20356048' }, 
                        {name: 'Esophageal cancer', link : 'https://www.mayoclinic.org/diseases-conditions/esophageal-cancer/symptoms-causes/syc-20356084' },
                        {name: 'Mouth cancer', link : 'https://www.mayoclinic.org/diseases-conditions/mouth-cancer/symptoms-causes/syc-20350997' }, 
                        {name: 'Throat cancer', link : 'https://www.mayoclinic.org/diseases-conditions/throat-cancer/symptoms-causes/syc-20366462' }
                    ], comment: 'Find a doctor', visible : false }          
                ],
                
            }
        ]        
     }; 

    formSymptoms: any[] = [];
    formFactors: any[] = [];
    formCauses: any[] = [];

    constructor() {
    }
    
    ngOnInit() {
        this.symptomsMatrix.symptoms.forEach(symptom => {
            this.formSymptoms.push(symptom);
        });
    }

    toggle(name: string) {
        this.symptomsMatrix.symptoms.forEach(symptom => {
            if(symptom.name == name) {
                symptom.visible = !symptom.visible;
            } else {
                symptom.visible = false;
            }
        });
    }

    toggleFactor (name: string) {
        this.symptomsMatrix.symptoms.forEach(symptom => {
            symptom.factors.forEach(factor => {
                if(factor.detail == name) {
                    factor.visible = !factor.visible;
                } else {
                    factor.visible = false;
                }
            });
        });
    }
}