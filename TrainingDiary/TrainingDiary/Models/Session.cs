using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TrainingDiary.Models
{
    public class Session
    {
        public int Id { get; set; }

        [DataType(DataType.Date)]
        public DateTime CompletedDate { get; set; }

        protected List<Excercise> _excercises;
        public List<Excercise> Excercises
        {
            get
            {
                return _excercises;
            }
            set
            {
                _excercises = value;
            }
        }

        protected List<ActiveTag> _activeTags;
        public List<ActiveTag> ActiveTags
        {
            get
            {
                return _activeTags;
            }
            set
            {
                _activeTags = value;
            }
        }

        public string UserId { get; set; }
    }
}
