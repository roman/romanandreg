require 'rake/clean'
require 'fileutils'

CLEAN.unshift('*.aux', '*.log')
CLOBBER.unshift('*.pdf')

def compile(file)
  sh 'pdflatex ' + file + '.tex'
end

def open(file)
  sh 'open ' + file + '.pdf'
end


task :default => :compile_and_open

desc 'Compiles and open CV'
task :cv do
  compile('curriculum_vitae')
  open('curriculum_vitae')
end

desc 'Compiles Motivation Letter'
task :mletter do
  compile('motivation_letter')
  open('motivation_letter')
end
