---
title: "Batalla en el campo de fresas"
date: "2019-08-21"
language: "es"
---

Este trabajo se propone a evaluar la huelga de los jornaleros de San Quintín, que se dio durante marzo y mayo del 2015, a partir de la perspectiva de los trabajadores de la compañía Berrymex, productora de fresas en Baja California. Es necesario analizar cautelosamente las principales partes involucradas en este conflicto, es decir, los jornaleros y los inversionistas de la empresa; a partir de ahí, podemos establecer relaciones dialécticas como propuesta de modelo para entender cada rumbo que tomó la huelga. Eso significa comprender, por ejemplo, la dinámica de la posición que tomaron los medios de comunicación a respecto de la huelga y su relación con los intereses del capital, la idea de base y superestructura, y también aclarar la relación de Berrymex y del derecho en el Estado capitalista. Para empezar con este trayecto, empezaremos por tratar de especificar ambas burguesía y clase obrera en el caso del Valle de San Quintín.

This is just a test for a post and for code `(str:concat "aa" "bb")`.
```javascript
import "someeting"

```

```lisp
(defun parse-citations (string object)
  "Parses each citation contained in `string' and push them to `citations' in `object'."
  (when object
    (let* ((counter 1))
      (do-occurrences-between citation-string
          " c["
          "]"
          string
        (let ((citation (parse-citation citation-string counter)))
          (pushnew citation (citations object))

          ;; TODO: Create a function that modifies the value of string
          ;; instead of making a new copy each funcall.
          ;; Use nsubstitute http://clhs.lisp.se/Body/f_sbs_s.htm
          (setf string (substitute-citation string citation-string citation)))
        (incf counter))

      (setf (citations object) (reverse (citations object)))
      (return-from parse-citations string))))
```

