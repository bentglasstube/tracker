#!/usr/bin/env perl

use v5.12;
use strict;
use warnings;

use IO::File;
use JSON;

sub parse_item {
  my (@lines) = @_;

  my %item = (
    name    => $lines[0],
    special => $lines[22],
  );

  if ($lines[1] eq 'Attack') {
    $item{attack}     = $lines[10];
    $item{twohand}    = $lines[11] eq 'Yes';
    $item{spellblade} = $lines[12] eq 'Yes';
    $item{throwable}  = $lines[13] eq 'Yes';
    $item{strength}   = $lines[14];
    $item{stamina}    = $lines[15];
    $item{magic}      = $lines[16];
    $item{agility}    = $lines[17];
    $item{critical}   = $lines[18];
  } elsif ($lines[1] eq 'Weight') {
    $item{weight}   = $lines[10];
    $item{defense}  = $lines[11];
    $item{mdefense} = $lines[12];
    $item{evade}    = $lines[13];
    $item{mevade}   = $lines[14];
    $item{agility}  = $lines[15];
    $item{magic}    = $lines[16];
    $item{strength} = $lines[17];
    $item{stamina}  = $lines[18];
  }

  # Remove "O" before spell names
  $item{special} =~ s/O([A-Z])/$1/g;
  delete $item{special} if $item{special} eq 'None';

  my $jobs = $lines[20];
  $jobs =~ s/ Mage/Mage/g;
  $jobs =~ s/Mystic Knight/MysticKnight/g;
  $item{jobs} = [ split / /, $jobs ];

  return \%item;
}

my $fh = IO::File->new(shift, 'r');

my @data  = ();
my @items = ();
while (my $line = $fh->getline) {
  chomp $line;

  if ($line eq ' ') {
    push @items, parse_item(@data);
    @data = ();
  } else {
    push @data, $line;
  }
}

say JSON->new->pretty->encode(\@items);
