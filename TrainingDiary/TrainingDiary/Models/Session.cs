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

        protected string _excercisesJson;
        public string ExcercisesJson
        {
            get
            {
                return JsonConvert.SerializeObject(Excercises);
            }
            set
            {
                _excercisesJson = value;
                Excercises = JsonConvert.DeserializeObject<List<Excercise>>(value);
            }
        }

        protected List<Excercise> _excercises;
        public List<Excercise> Excercises
        {
            get
            {
                if (_excercises != null)
                {
                    return _excercises;
                }
                else if (string.IsNullOrEmpty(_excercisesJson))
                {
                    return JsonConvert.DeserializeObject<List<Excercise>>(_excercisesJson);
                }
                else
                {
                    return null;
                }
            }
            set
            {
                _excercises = value;
            }
        }
    }
}
