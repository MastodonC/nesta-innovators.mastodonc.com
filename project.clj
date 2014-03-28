(defproject nesta-innovators "1.2.3"
    :dependencies [[org.clojure/clojurescript "0.0-2173"]]
    :plugins [[lein-cljsbuild "1.0.2"]]
    :cljsbuild {
      :builds [{
          ; The path to the top-level ClojureScript source directory:
          :source-paths ["src-cljs"]
          ; The standard ClojureScript compiler options:
          ; (See the ClojureScript compiler documentation for details.)
          :compiler {
            :output-to "public/js/main.js"  ; default: target/cljsbuild-main.js
            :optimizations :whitespace
            :externs ["public/js/sigma.min.js", "public/js/sigma.parsers.json.min.js"]
            :pretty-print true}}]})
