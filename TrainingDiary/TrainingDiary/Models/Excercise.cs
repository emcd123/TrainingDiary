using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TrainingDiary.Models
{
    public class Excercise
    {
        //[Key, ForeignKey("ExcerciseId")]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Sets { get; set; }
        public int Reps { get; set; }
        public int Rpe { get; set; }
        public int WeightLifted { get; set; }
    }
}
